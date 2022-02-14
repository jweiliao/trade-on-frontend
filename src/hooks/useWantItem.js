import { useState } from 'react'
import Swal from 'sweetalert2'

// 引入新增留言 API
import { addMessage } from '../WebAPI'

export default function useWantItem(
  applyMsgs,
  setApplyMsgs,
  isApplyMessage,
  post,
  postMessageId,
  handleToggleWantPopUp
) {
  // 設定索取留言內容的 state，預設為空值
  const [newApplyInput, setNewApplyInput] = useState('')

  // 設定寄送方式選項的 state，預設為空值
  const [select, setSelect] = useState('')

  // 設定 錯誤訊息 errorMessages 的 state，預設為空物件
  const [errorMessages, setErrorMessages] = useState(false)

  const handleWantItem = (e) => {
    // 點擊 "確認"按鈕後先判斷是否有填寄送方式，如果沒有填寫，出現提示，且不讓索取者提出新索取
    if (select === '') {
      setErrorMessages(true)
      return
    } else if (post.isDealLimit) {
      //  索取請求視窗在點擊 "確認" 按鈕前判斷 "交易的數量總和已達到上限"，如果為 true，不讓索取者提出新索取，否則，進入新贈索求的流程
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '物品剛被贈送出去了！',
        timer: 1500,
      })
      handleToggleWantPopUp()
    } else {
      // 因為 API 為非同步的關係，設定一個 isUnmounted 的開關，讓非同步先執行完之後，再處理接下來的程式
      let isUnmounted = false
      // e.preventDefault()

      // 變數 newApply 為串接新增索取的 API，並帶入參數 "content"、"messageType"、"chooseDealMethod"、"relatedId"
      const newApply = {
        content: newApplyInput,
        messageType: 'apply',
        chooseDealMethod: select,
        relatedId: postMessageId,
      }

      try {
        // 串接新增索取請求的 API，並帶入 newApply
        addMessage(newApply)
          .then((res) => {
            // 如果新增索取請求成功
            if (res.data.message === 'success') {
              const newApplyMsgRes = res.data.new
              if (!isUnmounted) {
                // 將回傳的值新增到 applyMsgs 的 state
                setApplyMsgs([...applyMsgs, newApplyMsgRes])
              }
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '有地方沒填喔！',
              timer: 1500,
            })
            console.log(err)
          })
      } catch (err) {
        console.log(err)
      }
      isUnmounted = true
      // 索取請求的留言內容清空
      setNewApplyInput('')

      // toggle 索取請求彈窗：若已顯示彈窗隱藏，否則就顯示
      if (isUnmounted) {
        handleToggleWantPopUp()
      }

      isUnmounted = false
    }
  }

  return {
    select,
    setSelect,
    newApplyInput,
    setNewApplyInput,
    handleWantItem,
    errorMessages,
  }
}
