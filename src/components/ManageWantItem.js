import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Textarea } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'
import { addMessage } from '../WebAPI'
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

const Location = styled(Textarea)`
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
  postAuthorId,
  handleToggleWantPopUp,
}) {
  const { applyMsgs, applyMainMsgs } = useComments(
    isApplyMessage,
    postMessageId
  )

  // console.log('WantapplyMsgs', applyMainMsgs)
  console.log('post', post)
  const [select, setSelect] = useState('')

  // const handleSelectChange = (e) => {
  //   setSelect(e.target.value)
  // }

  const [newApplyInput, setNewApplyInput] = useState('')

  // const [transactions, setTransactions] = useState([])
  // const [newTransactionData, setNewTransactionData] = useState({
  //   amount: 1,
  //   accountNum: 0,
  //   bankName: '',
  //   accountName: 'author',
  //   bankCode: 888,
  // })

  // const handleInput = (e) => {
  //   const { name, value } = e.target
  //   setNewTransactionData({
  //     ...newTransactionData,
  //     [name]: value,
  //   })
  // }

  // useEffect(() => {
  //   fetchTransactions()
  // }, [])

  // const fetchTransactions = async () => {
  //   const { data } = await getAllTransactions(1000)
  //   if (data.message === 'No deal submitted yet.') return
  //   setTransactions(data.allTransactions)
  // }

  // console.log('receptapply', applyMsgId)
  // console.log('transactions', transactions)

  const handleWantItem = (e) => {
    e.preventDefault()

    // acceptTransaction(applyMsgId, newTransactionData)
    //   .then((res) => {
    //     const newTransactionData = res.data
    //     console.log(res.data)
    //     if (res.data.message === 'success') {
    //       Swal.fire({
    //         icon: 'success',
    //         title: '交易成立',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       })
    //       setIsAccept(true)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     Swal.fire('發生錯誤！')
    //   })
    // 串接新增回覆的 API，並帶入參數 "content"、"messageType"、"relatedMsg"、"relatedId"

    const newApply = {
      content: newApplyInput,
      messageType: 'apply',
      chooseDealMethod: {
        faceToFace: true,
        evenEleven: true,
        familyMart: true,
      },
      relatedId: postMessageId,
    }

    console.log('newTransactionData', newApply)
    // console.log('select', select)
    // try {
    //   addMessage(newApply).then((res) => {
    //     console.log('新增索取', res.data)
    //     // const replayMsg = res.data.new
    //     // if (res.data.message === 'success') {
    //     //   setApplyMsgs([
    //     //     ...applyMsgs,
    //     //     {
    //     //       content: replayMsg.content,
    //     //       messageType: replayMsg.messageType,
    //     //       author: replayMsg.author,
    //     //       _id: replayMsg.id,
    //     //       relatedMsg: replayMsg.relatedMsg,
    //     //       updatedAt: replayMsg.lastModified,
    //     //     },
    //     //   ])
    //     //   setShowMainTextArea(!showMainTextArea)
    //     // }
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
    setNewApplyInput('')
    handleToggleWantPopUp()
  }

  console.log('select', select)

  const Alert = (e) => {
    alert('Selected Radio Value ' + e.target.value)
  }
  return (
    <>
      <BackDrop onClick={handleToggleWantPopUp}></BackDrop>
      <GiveItemWrapper>
        <Title>索取請求</Title>
        <GiveDetail>物品名稱：{post.itemName}</GiveDetail>
        <GiveDetail>物品數量：{post.quantity}</GiveDetail>
        <GiveDetail>
          留言：
          <Location
            rows="3"
            maxlength="200"
            name="apply"
            placeholder="請輸入要給贈物者的話"
            value={newApplyInput}
            onChange={(e) => setNewApplyInput(e.target.value)}
            required
          ></Location>
        </GiveDetail>

        {post.tradingOptions.faceToFace ? (
          <RadioItem>
            <RadioButton
              type="radio"
              name="tradingOptions"
              value="faceToFace"
              checked={true}
              onChange={Alert()}
            />
            <RadioButtonLabel />
            <div>面交</div>
          </RadioItem>
        ) : null}
        {post.tradingOptions &&
          post.tradingOptions.convenientStores &&
          post.tradingOptions.convenientStores.map((applyDealMethodItem) => {
            if (applyDealMethodItem === '7-11') {
              return (
                <RadioItem>
                  <RadioButton
                    type="radio"
                    name="tradingOptions"
                    value="sevenEleven"
                    checked={applyDealMethodItem === '7-11'}
                    onChange={(e) => setSelect(e.target.value)}
                  />
                  <RadioButtonLabel />
                  <div>7-11 店到店</div>
                </RadioItem>
              )
            }
            if (applyDealMethodItem === '全家') {
              return (
                <RadioItem>
                  <RadioButton
                    type="radio"
                    name="tradingOptions"
                    value="familyMart"
                    checked={applyDealMethodItem === '全家'}
                    onChange={(e) => setSelect(e.target.value)}
                  />
                  <RadioButtonLabel />
                  <div>全家店到店</div>
                </RadioItem>
              )
            }
          })}
        <ConfirmButtonsWrapper>
          <CancelButton onClick={handleToggleWantPopUp}>取消</CancelButton>
          <GiveButton type="submit" onClick={handleWantItem}>
            下一步
          </GiveButton>
        </ConfirmButtonsWrapper>
      </GiveItemWrapper>
    </>
  )
}

// <GiveItemWrapper>
//   <Title>贈與物品</Title>
//   <GiveDetail>物品名稱：{post ? post.itemName : '暫無'}</GiveDetail>
//   <GiveDetail>物品數量： {post ? post.quantity : 0} 個</GiveDetail>
//   <GiveDetail>
//     寄送方式：
//     <GiveDealMethod>
//       {applyDealMethod.faceToFace
//         ? '面交'
//         : applyDealMethod.convenientStore === '7-11'
//         ? '7-11店到店'
//         : '全家店到店'}
//     </GiveDealMethod>
//     {applyDealMethod.convenientStore && (
//       <BankInfo>
//         匯款銀行：
//         <Location
//           name="bankName"
//           placeholder="請輸入匯款銀行名稱"
//           onChange={handleInput}
//         ></Location>
//         匯款帳戶：
//         <Location
//           name="accountNum"
//           placeholder="請輸入匯款帳戶"
//           onChange={handleInput}
//         ></Location>
//       </BankInfo>
//     )}
//   </GiveDetail>

//   <ConfirmButtonsWrapper>
//     <CancelButton onClick={handleToggleGivePopUp}>取消</CancelButton>
//     <GiveButton type="submit" onClick={handleGiveItem}>
//       確認
//     </GiveButton>
//   </ConfirmButtonsWrapper>
// </GiveItemWrapper>
