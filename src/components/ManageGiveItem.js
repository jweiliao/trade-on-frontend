import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'

// 引入接受索取請求、拿取所有交易資料的 API
import { acceptTransaction, getAllTransactions } from '../WebAPI'

// 引入 InputErrorMessage 這個 component
import { InputErrorMessage } from './textField'

// 引入操作留言的 hook
import useComments from '../hooks/useComments'

/* 彈窗底下的遮罩 */
const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

/* 整個贈與禮物的彈窗 */
const GiveItemWrapper = styled.div`
  z-index: 100;
  width: 500px;
  padding: 10px 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid ${(props) => props.theme.general_500};
  border-radius: 4px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-out;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    max-width: 80%;
  }
`

/* 贈與禮物彈窗的標題 */
const Title = styled(BackstageTitle)`
  font-weight: 500;
  padding-bottom: 7px;
  text-align: left;
  border-bottom: 2px solid ${(props) => props.theme.general_500};

  ${MEDIA_QUERY_SM} {
    margin-top: 3rem;
  }
`
/* 贈與項目的細節 */
const GiveDetail = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 30px;
`

/* 收款資訊  */
const BankInfo = styled.div`
  margin-top: 30px;
`

/* 收款資訊輸入欄  */
const BankInfoInput = styled(Input)`
  width: 100%;
`

/* 彈窗下方操作按鈕們的全部區塊 */
const ConfirmButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

/* "取消" 按鈕 */
const CancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

/* "確認" 按鈕 */
const GiveButton = styled(SmallButton)`
  margin-left: 27px;
  background-color: ${(props) => props.theme.primary_100};
  :hover {
    background-color: ${(props) => props.theme.primary_200};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
`

export default function ManageGiveItem({
  post,
  applyDealMethod,
  handleToggleGivePopUp,
  applyMsgId,
  setIsAccept,
}) {
  // 設定 transactions 的 state，預設為空陣列
  const [transactions, setTransactions] = useState([])

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

  // 為了方便查看交易資訊，之後會刪除
  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    // 串接拿到所有交易進程 的 API
    const { data } = await getAllTransactions(1000)
    if (data.message === 'No deal submitted yet.') return
    // 成功拿到資料後，將資料更新到 transactions 的 state
    setTransactions(data.allTransactions)
  }

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
    } else if (!/^\d{10,14}$/.test(values.accountNum)) {
      errors.accountNum = '銀行帳號格式不正確'
    }

    return errors
  }

  useEffect(() => {
    // 如果沒有出現錯誤訊息，且提交狀態為 true，則執行新增交易
    if (Object.keys(errorMessages).length === 0 && isSubmitting) {
      // console.log('newTransactionData', newTransactionData)

      // 串接新增交易的 API，並帶入 applyMsgId，newTransactionData
      acceptTransaction(applyMsgId, newTransactionData)
        .then((res) => {
          // const newTransactionData = res.data
          // console.log(newTransactionData)

          // 如果新增交易成功
          if (res.data.message === 'success') {
            Swal.fire({
              icon: 'success',
              title: '交易成立',
              showConfirmButton: false,
              timer: 1500,
            })
            // 更新 isAccept 的狀態為 true
            setIsAccept(true)
          }
        })
        .catch((err) => {
          console.log(err)
          Swal.fire('發生錯誤！')
        })

      // toggle 給與禮物彈窗：若已顯示彈窗隱藏，否則就顯示
      handleToggleGivePopUp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessages])

  // console.log('receptapply', applyMsgId)
  // console.log('transactions', transactions)

  // 點擊 "確認" 按鈕後
  const handleGiveItem = (e) => {
    e.preventDefault()

    // 驗證輸入框內的格式
    setErrorMessages(validateBankInfo(newTransactionData))

    // 更新 isSubmitting 的 state 為 true
    setIsSubmitting(true)
  }

  return (
    <>
      {/* 彈窗底下的遮罩，點擊彈窗以外的地方，會收回彈窗  */}
      <BackDrop onClick={handleToggleGivePopUp}></BackDrop>
      {/* 整個贈與禮物的彈窗 */}
      <GiveItemWrapper>
        <Title>贈與物品</Title>
        <GiveDetail>物品名稱：{post ? post.itemName : '暫無'}</GiveDetail>
        <GiveDetail>物品數量： {post ? post.quantity : 0} 個</GiveDetail>
        {/* 顯示索取者選擇的寄送方式 */}
        <GiveDetail>
          寄送方式：
          {applyDealMethod && (
            <>
              {applyDealMethod.faceToFace
                ? '面交'
                : applyDealMethod.convenientStore === '7-11'
                ? '7-11店到店'
                : '全家店到店'}
            </>
          )}
          {/* 若選擇店到店的寄送方式，下方出現填寫收款資訊的區塊，並在 "確認" 按鈕送出前驗證輸入內容的格式 */}
          {applyDealMethod.convenientStore && (
            <>
              <BankInfo>
                銀行代碼：
                <BankInfoInput
                  name="bankCode"
                  placeholder="請輸入收款銀行的代碼"
                  onChange={handleInput}
                ></BankInfoInput>
                {errorMessages.bankCode && (
                  <InputErrorMessage>
                    {errorMessages.bankCode}
                  </InputErrorMessage>
                )}
              </BankInfo>
              <BankInfo>
                收款帳號：
                <BankInfoInput
                  name="accountNum"
                  placeholder="請輸入收款的銀行帳號"
                  onChange={handleInput}
                ></BankInfoInput>
                {errorMessages.accountNum && (
                  <InputErrorMessage>
                    {errorMessages.accountNum}
                  </InputErrorMessage>
                )}
              </BankInfo>
            </>
          )}
        </GiveDetail>

        {/* 彈窗下方操作按鈕們的全部區塊 */}
        <ConfirmButtonsWrapper>
          {/* 點擊 "取消" 按鈕後，隱藏索取請求的彈窗 */}
          <CancelButton onClick={handleToggleGivePopUp}>取消</CancelButton>

          {/* 點擊 "確認" 按鈕，執行 "handleGiveItem" */}
          <GiveButton type="submit" onClick={handleGiveItem}>
            確認
          </GiveButton>
        </ConfirmButtonsWrapper>
      </GiveItemWrapper>
    </>
  )
}
