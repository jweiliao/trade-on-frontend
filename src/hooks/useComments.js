import { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'
import {
  getPostMessage,
  deleteMessage,
  updateMessage,
  replyMessage,
  addMessage,
} from '../WebAPI'

export default function useComments(isApplyMessage, postMessageId) {
  const [questionMsgs, setQuestionMsgs] = useState({})
  const [mainMsgs, setMainMsgs] = useState({})
  const [relatedMsgs, setRelatedMsgs] = useState({})
  const [applyMsgs, setApplyMsgs] = useState({})
  const [applyMainMsgs, setApplyMainMsgs] = useState({})
  const [applyRelatedMsgs, setApplyRelatedMsgs] = useState({})
  const [showMainTextArea, setShowMainTextArea] = useState(false)
  const [showSubTextArea, setShowSubTextArea] = useState(false)

  const [newMessageInput, setNewMessageInput] = useState('')

  // 儲存是否正在 edit 的狀態
  const [isUpdating, setIsUpdating] = useState(null)
  const [editValue, setEditValue] = useState('')

  // 儲存是否正在 reply 的狀態
  const [isReplying, setIsReplying] = useState(null)

  // 判斷是索取留言，還是詢問留言
  const isApplyMessageOrNot = useCallback(
    (applyMessage, questionMessage) => {
      return isApplyMessage ? applyMessage : questionMessage
    },
    [isApplyMessage]
  )

  useEffect(() => {
    const fetchMessages = async () => {
      if (postMessageId) {
        const res = await getPostMessage(postMessageId)
        console.log('resMessage', res.data.postMessages)
        const messages = res.data.postMessages
        if (messages && messages[0]) {
          messages.map((msg) => {
            if (msg._id === 'question') {
              setQuestionMsgs(msg.messages)
            } else {
              setApplyMsgs(msg.messages)
            }

            if (msg._id === 'apply') {
              setApplyMsgs(msg.messages)
            } else {
              setQuestionMsgs(msg.messages)
            }
          })
        }
      }
    }
    fetchMessages()
  }, [postMessageId])

  useEffect(() => {
    if (applyMsgs.length > 0) {
      setApplyMainMsgs(
        applyMsgs.filter((msg) => {
          return typeof msg.relatedMsg === 'undefined'
        })
      )
      setApplyRelatedMsgs(
        applyMsgs.filter((msg) => {
          return typeof msg.relatedMsg !== 'undefined'
        })
      )
    }
    if (questionMsgs.length > 0) {
      setMainMsgs(
        questionMsgs.filter((msg) => {
          return typeof msg.relatedMsg === 'undefined'
        })
      )
      setRelatedMsgs(
        questionMsgs.filter((msg) => {
          return typeof msg.relatedMsg !== 'undefined'
        })
      )
    }
  }, [questionMsgs, applyMsgs])

  const handleMainMsgReply = (id) => {
    setShowMainTextArea(!showMainTextArea)
    setIsReplying(id)
  }

  const handleSubMsgReply = (id) => {
    setShowSubTextArea(!showSubTextArea)
    setIsReplying(id)
  }

  // 執行新增回覆功能
  const handleReplySubmit = (relatedMsg, isApplyMessage) => {
    // e.preventDefault()
    console.log('relatedMsg', newMessageInput, relatedMsg)
    console.log('postMessageId', postMessageId)

    // 串接新增回覆的 API，並帶入參數 "content"、"messageType"、"relatedMsg"、"relatedId"

    const newMessage = {
      content: newMessageInput,
      messageType: isApplyMessage ? 'apply' : 'question',
      relatedMsg: relatedMsg,
      relatedId: postMessageId,
    }

    try {
      replyMessage(relatedMsg, newMessage).then((res) => {
        console.log('回覆', res.data.new)
        // const replayMsg = res.data.new
        // if (res.data.message === 'success') {
        //   setApplyMsgs([
        //     ...applyMsgs,
        //     {
        //       content: replayMsg.content,
        //       messageType: replayMsg.messageType,
        //       owner: replayMsg.owner,
        //       _id: replayMsg.id,
        //       relatedMsg: replayMsg.relatedMsg,
        //       updatedAt: replayMsg.lastModified,
        //     },
        //   ])
        //   setShowMainTextArea(!showMainTextArea)
        // }
      })
    } catch (err) {
      console.log(err)
    }
    setNewMessageInput('')
  }

  // 編輯留言
  const handleEditMsg = (e) => {
    const msgId = e.target.id
    console.log('editMsgId', msgId)
    if (editValue === '') {
      e.preventDefault()
    }
    const editMsg = {
      content: editValue,
    }
    console.log(editMsg)
    try {
      updateMessage(msgId, editMsg).then((res) => {
        console.log(res.data.update)
        const updatedMsg = res.data.update
        if (res.data.message === 'success') {
          isApplyMessageOrNot(
            setApplyMsgs,
            setQuestionMsgs
          )(
            isApplyMessageOrNot(applyMsgs, questionMsgs).map((msg) => {
              if (msg._id !== updatedMsg.id) return msg
              return {
                ...msg,
                content: updatedMsg.content,
              }
            })
          )
          //跳出 "更新成功"的彈窗提示
          Swal.fire({
            icon: 'success',
            title: '更新成功',
            showConfirmButton: false,
            timer: 1500,
          })
          setIsUpdating(false)
        }
      })
    } catch (err) {
      console.log(err)
      Swal.fire('請稍候再試一次!', 'error')
    }
    setEditValue('')
  }

  // 刪除留言
  const handleDeleteMessage = (id) => {
    Swal.fire({
      title: '刪除',
      text: '確定要刪除嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e25151',
      cancelButtonColor: '#B7B7B7',
      cancelButtonText: '不，取消刪除',
      confirmButtonText: '是的，我要刪除',
      reverseButtons: true,
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMessage(id)
          .then((res) => {
            if (res.data.message === 'success') {
              console.log('qsm', questionMsgs)
              console.log('qsmId', id)
              isApplyMessageOrNot(
                setApplyMsgs,
                setQuestionMsgs
              )(
                isApplyMessageOrNot(applyMsgs, questionMsgs).filter(
                  (msg) => msg._id !== id && msg.relatedMsg !== id
                )
              )
              Swal.fire({
                icon: 'success',
                title: '刪除成功',
                showConfirmButton: false,
                timer: 1500,
              })
            }
          })
          .catch((err) => {
            console.log(err)
            Swal.fire('發生錯誤！')
          })
      }
    })
  }
  return {
    questionMsgs,
    setQuestionMsgs,
    mainMsgs,
    setMainMsgs,
    applyMsgs,
    relatedMsgs,
    setRelatedMsgs,
    setApplyMsgs,
    applyMainMsgs,
    setApplyMainMsgs,
    applyRelatedMsgs,
    setApplyRelatedMsgs,
    isUpdating,
    setIsUpdating,
    editValue,
    setEditValue,
    handleEditMsg,
    handleDeleteMessage,
    handleMainMsgReply,
    handleSubMsgReply,
    showMainTextArea,
    showSubTextArea,
    isApplyMessageOrNot,
    newMessageInput,
    setNewMessageInput,
    handleReplySubmit,
    isReplying,
    setIsReplying,
  }
}
