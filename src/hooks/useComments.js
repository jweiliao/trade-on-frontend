import { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'

// 引入留言相關的 API (取得 post 的所有留言以及新增、更新、刪除、回覆留言)
import {
  getPostMessage,
  addMessage,
  updateMessage,
  deleteMessage,
  replyMessage,
} from '../WebAPI'

// useComments 帶入 props
// 1. isApplyMessage => 判斷是否為索取請求留言，還是詢問留言
// 2. postMessageId => 此留言的 id
export default function useComments(isApplyMessage, postMessageId) {
  // 設定 詢問留言 的 state
  const [questionMsgs, setQuestionMsgs] = useState({})

  // 設定 詢問留言 的主留言 state
  const [mainMsgs, setMainMsgs] = useState({})

  // 設定 詢問留言 的子留言 state
  const [relatedMsgs, setRelatedMsgs] = useState({})

  //  設定 索取請求留言 的 state
  const [applyMsgs, setApplyMsgs] = useState({})

  //  設定 索取請求留言 的主留言 state
  const [applyMainMsgs, setApplyMainMsgs] = useState({})

  //  設定 索取請求留言 的子留言 state
  const [applyRelatedMsgs, setApplyRelatedMsgs] = useState({})

  //  設定新增主留言輸入框是否顯示的 state，預設為不顯示
  const [showMainTextArea, setShowMainTextArea] = useState(false)

  //  設定新增子留言輸入框是否顯示的 state，預設為不顯示
  const [showSubTextArea, setShowSubTextArea] = useState(false)

  //  設定編輯留言輸入框的 state，預設為空值
  const [newMessageInput, setNewMessageInput] = useState('')

  // 設定是否正在編輯留言的 state
  const [isUpdating, setIsUpdating] = useState(null)

  // 設定編輯留言的輸入內容的 state，預設為空值
  const [editValue, setEditValue] = useState('')

  // 設定是否正在回覆留言的狀態
  const [isReplying, setIsReplying] = useState(null)

  // 判斷是索取請求的留言，還是詢問留言，如果 isApplyMessage 為 true，則顯示索取請求的留言
  const isApplyMessageOrNot = useCallback(
    (applyMessage, questionMessage) => {
      return isApplyMessage ? applyMessage : questionMessage
    },
    [isApplyMessage]
  )

  // 拿到特定 post 中所有留言，並分成索取請求留言、詢問留言
  useEffect(() => {
    const fetchMessages = async () => {
      if (postMessageId) {
        // 串接拿到特定 post 中所有留言的 API
        const res = await getPostMessage(postMessageId)
        // 拿到回傳的所有留言
        const messages = res.data.postMessages
        console.log('resMessage', res.data.postMessages)
        if (messages && messages[0]) {
          messages.map((msg) => {
            // 如果為詢問留言，將資料更新到 questionMsgs 的 state
            if (msg._id === 'question') {
              setQuestionMsgs(msg.messages)
            } else {
              // 如果為索取留言，將資料更新到 applyMsgs 的 state
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

  // 將索取請求留言、詢問留言底下再細分為主留言、子留言
  useEffect(() => {
    // 如果有詢問留言
    // 主留言為：詢問留言中沒有 relatedMsg 資料，且未被刪除的留言，將資料更新到 mainMsgs 的 state
    if (questionMsgs.length > 0) {
      setMainMsgs(
        questionMsgs.filter((msg) => {
          return (
            typeof msg.relatedMsg === 'undefined' && msg.isDeleted === false
          )
        })
      )
      // 子留言為：詢問留言中有 relatedMsg 資料，且未被刪除的留言，將資料更新到 relatedMsgs 的 state
      setRelatedMsgs(
        questionMsgs.filter((msg) => {
          return (
            typeof msg.relatedMsg !== 'undefined' && msg.isDeleted === false
          )
        })
      )
    }

    // 如果有索取請求的留言
    // 主留言為：索取請求留中沒有 relatedMsg 資料，且未被刪除的留言，將資料更新到 applyMainMsgs 的 state
    if (applyMsgs.length > 0) {
      setApplyMainMsgs(
        applyMsgs.filter((msg) => {
          return (
            typeof msg.relatedMsg === 'undefined' && msg.isDeleted === false
          )
        })
      )
      // 子留言為：索取請求留言中有 relatedMsg 資料，且未被刪除的留言，將資料更新到 relatedMsgs 的 state
      setApplyRelatedMsgs(
        applyMsgs.filter((msg) => {
          return (
            typeof msg.relatedMsg !== 'undefined' && msg.isDeleted === false
          )
        })
      )
    }
  }, [questionMsgs, applyMsgs])

  // 新增詢問留言
  const handleAddQuestionSubmit = (
    post,
    newMessageInput,
    setNewMessageInput,
    isApplyMessage
  ) => {
    // console.log('新增詢問留言的內容', newMessageInput)

    // 變數 newMessage 為串接新增留言的 API，要帶入的物件參數 "content"、"messageType"、 "relatedId"
    const newMessage = {
      content: newMessageInput,
      messageType: isApplyMessage ? 'apply' : 'question',
      relatedId: post.id,
    }

    try {
      // 串接新增詢問留言的 API，並帶入 newMessage
      addMessage(newMessage).then((res) => {
        // console.log('questionMsgs', questionMsgs)
        // console.log('mainMsgs', mainMsgs)

        const newMsgRes = res.data.new
        console.log('新增留言 API 回傳', newMsgRes)

        // 如果新增詢問留言成功
        if (res.data.message === 'success') {
          // 將回傳的值新增到 questionMsgs 的 state
          isApplyMessageOrNot(
            setApplyMsgs,
            setQuestionMsgs
          )([...isApplyMessageOrNot(applyMsgs, questionMsgs), newMsgRes])
          // setQuestionMsgs(...questionMsgs, newMsgRes)
        }
      })
    } catch (err) {
      console.log(err)
    }

    // 將留言輸入框設為空值
    setNewMessageInput('')
  }

  // 主留言中點擊 "回覆"
  const handleMainMsgReply = (id) => {
    // toggle 留言輸入區塊： 如果已顯示主留言輸入區塊，則隱藏，否則顯示主留言輸入區塊
    setShowMainTextArea(!showMainTextArea)
    // 將 id 更新到 isReplying 的 state 中
    setIsReplying(id)
  }

  // 子留言中點擊 "回覆"
  const handleSubMsgReply = (id) => {
    // toggle 留言輸入區塊： 如果已顯示子留言輸入區塊，則隱藏，否則顯示子留言輸入區塊
    setShowSubTextArea(!showSubTextArea)
    // 將 id 更新到 isReplying 的 state 中
    setIsReplying(id)
  }

  // 新增回覆留言
  const handleReplySubmit = (relatedMsg, isApplyMessage) => {
    // e.preventDefault()
    // console.log('relatedMsg', newMessageInput, relatedMsg)
    // console.log('postMessageId', postMessageId)

    // 變數 newMessage 為串接回覆留言的 API，要帶入的物件參數 "content"、"messageType"、 "relatedMsg"、"relatedId"
    const newMessage = {
      content: newMessageInput,
      messageType: isApplyMessage ? 'apply' : 'question',
      relatedMsg: relatedMsg,
      relatedId: postMessageId,
    }

    try {
      // 串接回覆留言的 API，並帶入 relatedMsg、 newMessage
      replyMessage(relatedMsg, newMessage).then((res) => {
        // console.log('回覆 API 的 res', res.data.new)
        // console.log('詢問留言', questionMsgs)

        const replyMsgRes = res.data.new

        // 如果新增回覆留言成功
        if (res.data.message === 'success') {
          // 根據回覆的為索取請求還是詢問留言，將回傳的值新增到 applyMsgs 或者是 questionMsgs 的 state 中
          isApplyMessageOrNot(
            setApplyMsgs,
            setQuestionMsgs
          )([...isApplyMessageOrNot(applyMsgs, questionMsgs), replyMsgRes])

          // toggle 主、子留言輸入框：若已顯示留言輸入框則隱藏，否則就顯示
          setShowMainTextArea(!showMainTextArea)
          setShowSubTextArea(!showSubTextArea)
        }
      })
    } catch (err) {
      console.log(err)
    }

    // 將留言輸入框設為空值
    setNewMessageInput('')
  }

  // 編輯留言
  const handleEditMsg = (e) => {
    // 取得 message 的 id
    const msgId = e.target.id

    // 如果編輯留言輸入框為空值，不進行任何動作
    if (editValue === '') {
      e.preventDefault()
    }

    // 編輯留言的 API 需要取得留言的寄送方式
    const chooseDealMethodValue = isApplyMessageOrNot(
      applyMsgs,
      questionMsgs
    ).map((msg) => {
      if (msg.id !== msgId) return
      if (msg.id === msgId) {
        if (msg.applyDealMethod === 'faceToFace') {
          return 'faceToFace'
        }
        if (
          msg.applyDealMethod &&
          msg.applyDealMethod.convenientStore === '全家'
        ) {
          return 'familyMart'
        } else {
          return 'sevenEleven'
        }
      }
    })

    // 變數 editMsg 為串接更新留言的 API，要帶入的物件參數 "content"、"chooseDealMethod"
    const editMsg = {
      content: editValue,
      chooseDealMethod: chooseDealMethodValue || null,
    }

    // console.log(editMsg)

    try {
      // 串接更新留言的 API，並帶入 msgId、editMsg
      updateMessage(msgId, editMsg).then((res) => {
        const updatedMsgRes = res.data.update
        console.log(res.data.update)

        // 如果更新留言成功
        if (res.data.message === 'success') {
          // 根據更新的為索取請求還是詢問留言，將回傳的值更新到 applyMsgs 或者是 questionMsgs 的 state 中
          isApplyMessageOrNot(
            setApplyMsgs,
            setQuestionMsgs
          )(
            isApplyMessageOrNot(applyMsgs, questionMsgs).map((msg) => {
              if (msg.id !== updatedMsgRes.id) return msg
              return {
                ...msg,
                content: updatedMsgRes.content,
                lastModified: updatedMsgRes.lastModified,
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

          // 更新 isUpdating 的狀態為 false
          setIsUpdating(false)
        }
      })
    } catch (err) {
      console.log(err)
      Swal.fire('請稍候再試一次!', 'error')
    }

    // 更新編輯留言輸入框的 state 為空值
    setEditValue('')
  }

  // 刪除留言
  const handleDeleteMessage = (id) => {
    // 跳出彈窗確認是否刪除
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
      // 若使用者確定刪除留言
      if (result.isConfirmed) {
        // 串接刪除留言的 API，並帶入此留言的 id
        deleteMessage(id)
          .then((res) => {
            // 如果刪除的為主留言，且成功
            if (res.data.message === 'success') {
              // 根據刪除的為索取請求還是詢問留言，將 isDeleted 為 true 的 state 更新到 applyMsgs 或者是 questionMsgs 中此刪除主留言的 state 中
              isApplyMessageOrNot(
                setApplyMsgs,
                setQuestionMsgs
              )(
                isApplyMessageOrNot(applyMsgs, questionMsgs).map((msg) => {
                  if (msg.id !== id) return msg
                  if (msg.id === id)
                    return {
                      ...msg,
                      isDeleted: true,
                    }
                })
              )
            }
            // 如果刪除的為子留言，且成功
            if (
              res.data.message === 'delete all related messages successfully.'
            ) {
              // 根據刪除的為索取請求還是詢問留言，將 isDeleted 為 true 的 state 更新到 applyMsgs 或者是 questionMsgs 中此筆刪除的主留言、子留言的 state 中
              isApplyMessageOrNot(
                setApplyMsgs,
                setQuestionMsgs
              )(
                isApplyMessageOrNot(applyMsgs, questionMsgs).map((msg) => {
                  if (msg.id !== id) return msg
                  if (msg.id === id || msg.relatedMsg === id)
                    return {
                      ...msg,
                      isDeleted: true,
                    }
                })
              )
            }
            //跳出 "刪除成功"的彈窗提示
            Swal.fire({
              icon: 'success',
              title: '刪除成功',
              showConfirmButton: false,
              timer: 1500,
            })
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
    setShowMainTextArea,
    isApplyMessageOrNot,
    newMessageInput,
    setNewMessageInput,
    handleReplySubmit,
    isReplying,
    setIsReplying,
    handleAddQuestionSubmit,
  }
}
