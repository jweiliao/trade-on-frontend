import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Textarea } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'
import { acceptTransaction, getAllTransactions } from '../WebAPI'
import useComments from '../hooks/useComments'
import useGiveItem from '../hooks/useGiveItem'
import {
  RadioWrapper,
  RadioItem,
  RadioButtonLabel,
  RadioButton,
} from './textField'

const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

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

const Title = styled(BackstageTitle)`
  ${MEDIA_QUERY_SM} {
    margin-top: 3rem;
  }
`

const GiveDetail = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 30px;
`
const BankInfo = styled.div`
  margin-top: 20px;
`

const GiveDealMethod = styled.span``

const Location = styled(Input)`
  width: 100%;
`

const ConfirmButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

const CancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

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
  isApplyMessage,
  post,
  postMessageId,
  applyDealMethod,
  handleToggleGivePopUp,
  applyMsgId,
  setIsAccept,
}) {
  const { applyMsgs, applyMainMsgs } = useComments(
    isApplyMessage,
    postMessageId
  )

  const [select, setSelect] = useState('optionA')
  const handleSelectChange = (event) => {
    const value = event.target.value
    setSelect(value)
  }

  const [transactions, setTransactions] = useState([])
  const [newTransactionData, setNewTransactionData] = useState({
    amount: 1,
    accountNum: null,
    bankCode: null,
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setNewTransactionData({
      ...newTransactionData,
      [name]: value,
    })
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const { data } = await getAllTransactions(1000)
    if (data.message === 'No deal submitted yet.') return
    setTransactions(data.allTransactions)
  }

  console.log('receptapply', applyMsgId)
  console.log('transactions', transactions)

  const handleGiveItem = (e) => {
    e.preventDefault()
    console.log('newTransactionData', newTransactionData)
    acceptTransaction(applyMsgId, newTransactionData)
      .then((res) => {
        const newTransactionData = res.data
        console.log(res.data)
        if (res.data.message === 'success') {
          Swal.fire({
            icon: 'success',
            title: '交易成立',
            showConfirmButton: false,
            timer: 1500,
          })
          setIsAccept(true)
        }
      })
      .catch((err) => {
        console.log(err)
        Swal.fire('發生錯誤！')
      })
    handleToggleGivePopUp()
  }

  return (
    <>
      <BackDrop onClick={handleToggleGivePopUp}></BackDrop>
      <GiveItemWrapper>
        <Title>贈與物品</Title>
        <GiveDetail>物品名稱：{post ? post.itemName : '暫無'}</GiveDetail>
        <GiveDetail>物品數量： {post ? post.quantity : 0} 個</GiveDetail>
        <GiveDetail>
          寄送方式：
          <GiveDealMethod>
            {applyDealMethod.faceToFace
              ? '面交'
              : applyDealMethod.convenientStore === '7-11'
              ? '7-11店到店'
              : '全家店到店'}
          </GiveDealMethod>
          {applyDealMethod.convenientStore && (
            <BankInfo>
              銀行代碼：
              <Location
                name="bankCode"
                placeholder="請輸入匯款銀行的銀行代碼"
                onChange={handleInput}
              ></Location>
              匯款帳戶：
              <Location
                name="accountNum"
                placeholder="請輸入匯款帳戶"
                onChange={handleInput}
              ></Location>
            </BankInfo>
          )}
        </GiveDetail>

        <ConfirmButtonsWrapper>
          <CancelButton onClick={handleToggleGivePopUp}>取消</CancelButton>
          <GiveButton type="submit" onClick={handleGiveItem}>
            確認
          </GiveButton>
        </ConfirmButtonsWrapper>
      </GiveItemWrapper>
    </>
  )
}
