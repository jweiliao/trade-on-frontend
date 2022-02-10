import { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'

// 引入新增留言 API
import { acceptTransaction } from '../WebAPI'

export default function useGiveItem(
  handleToggleGivePopUp,
  applyMsgId,
  applyMainMsgs,
  setApplyMainMsgs
) {
  // 設定 新增交易 newTransactionData 的 state，預設為交易數量為 1，收款資訊為 null
  const [newTransactionData, setNewTransactionData] = useState({
    amount: 1,
    accountNum: null,
    bankCode: null,
  })

  // 設定 錯誤訊息 errorMessages 的 state，預設為空物件
  const [errorMessages, setErrorMessages] = useState({})

  // 設定 是否為提交 isSubmitting 的 state，預設為 false
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 當輸入框內有值時
  const handleInput = (e) => {
    const { name, value } = e.target
    // 將輸入的值更新到 newTransactionData 的 state
    setNewTransactionData({
      ...newTransactionData,
      [name]: value,
    })
    // 清空 errorMessages 的 state
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: '',
    })
  }

  // 驗證輸入內容的格式
  const validateBankInfo = (values) => {
    let errors = {}
    // 如果沒有輸入任何的值，則顯示'此欄位為必填'
    if (!values.bankCode) {
      errors.bankCode = '此欄位為必填'
      // 如果有輸入值，則驗證是否符合格式
    } else if (!/^\d{3}$/.test(values.bankCode)) {
      errors.bankCode = '銀行代碼格式不正確'
    }

    if (!values.accountNum) {
      // 如果沒有輸入任何的值，則顯示'此欄位為必填'
      errors.accountNum = '此欄位為必填'
      // 如果有輸入值，則驗證是否符合格式
    } else if (!/^\d{10,16}$/.test(values.accountNum)) {
      errors.accountNum = '銀行帳號格式不正確'
    }
    return errors
  }

  const confirmGiveItem = useCallback(
    () => {
      // 如果沒有出現錯誤訊息，且提交狀態為 true，則執行新增交易
      if (Object.keys(errorMessages).length === 0 && isSubmitting) {
        // 因為 API 為非同步的關係，設定一個 isUnmounted 的開關，讓非同步先執行完之後，再處理接下來的程式
        let isUnmounted = false

        // 串接新增交易的 API，並帶入 applyMsgId，newTransactionData
        try {
          acceptTransaction(applyMsgId, newTransactionData)
            .then((res) => {
              // 如果新增交易成功
              if (res.data.message === 'success') {
                if (!isUnmounted) {
                  Swal.fire({
                    icon: 'success',
                    title: '交易成立',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                }
                // 更新 applyMainMsgs 的 state, 將該留言的 isDealing 設為 true
                setApplyMainMsgs(
                  applyMainMsgs.map((msg) => {
                    if (msg.id !== applyMsgId) return msg
                    return {
                      ...msg,
                      isDealing: true,
                    }
                  })
                )
              }
            })
            .catch((err) => {
              console.log(err)
              Swal.fire('發生錯誤！')
            })
        } catch (err) {
          console.log(err)
        }

        isUnmounted = true

        // toggle 索取請求彈窗：若已顯示彈窗隱藏，否則就顯示
        if (isUnmounted) {
          handleToggleGivePopUp()
        }
        isUnmounted = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errorMessages, isSubmitting]
  )

  // confirmGiveItem 有改變時，執行 confirmGiveItem()
  useEffect(() => {
    confirmGiveItem()
  }, [confirmGiveItem])

  // 點擊 "確認" 按鈕後
  const handleGiveItem = (applyDealMethod) => {
    // 如果交易方式為店到店，驗證輸入框內容的格式
    if (!applyDealMethod.faceToFace) {
      // 驗證輸入框內的格式
      setErrorMessages(validateBankInfo(newTransactionData))
    }

    // 更新 isSubmitting 的 state 為 true
    setIsSubmitting(true)
  }

  return {
    errorMessages,
    handleInput,
    handleGiveItem,
  }
}
