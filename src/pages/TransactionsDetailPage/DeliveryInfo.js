import React, { useState } from 'react'
import styled from 'styled-components'
import DeliveryData from './DeliveryData'
import { Input } from '../../components/textField'
import { SmallButton, DangerSmallButton } from '../../components/buttons'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { DeliveryTab } from './DeliveryTabs'

/* DeliveryStatusTabsWrapper - 交易進程的全部區塊 */
const DeliveryStatusTabsWrapper = styled.div`
  display: flex;
  margin: 0px 24px 5px 24px;
`
/* StatusTab - 交易進程的每一個 tab */
const StatusTab = styled(DeliveryTab)``

/* Content - 交易資訊的全部區塊 */
const Content = styled.div`
  max-width: 100%;
  height: 310px;
  margin: 0px 24px;
  padding: 25px 30px;
  border: 1px solid ${(props) => props.theme.general_500};
`
/* Detail - 交易資訊內的文字 */
const Detail = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* Bottom - 交易進程最下方，為進程中所需填入的欄位、點擊的按鈕等的全部區塊 */
const Bottom = styled.div``

/* InputWrapper - 交易進程中需輸入欄位的全部區塊 */
const InputWrapper = styled.div`
  margin-bottom: 50px;
  margin: 0px 24px 5px 24px;
`
/* InputText - 交易進程中需輸入的每一欄 */
const InputText = styled(Input)`
  width: 100%;

  // input 的背景為透明的
  background: transparent;
`
/* ButtonsWrapper- 交易進程中需點擊的按鈕的全部區塊 */
const ButtonsWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
/* Button- 交易進程中，除了 "取消交易" 外，需點擊每一個按鈕 */
const Button = styled(SmallButton)``

/* DangerButton- 交易進程中的 "取消交易" 按鈕 */
const DangerButton = styled(DangerSmallButton)`
  margin-right: 30px;
  ${MEDIA_QUERY_MD} {
    margin-right: 5px;
  }
`

// 交易詳情頁的進程與內容顯示
const DeliveryInfo = () => {
  // 設定判斷為面交的 state
  const [faceToFace, setFaceToFace] = useState(false)
  // 設定判斷是否為贈物者的 state
  const [isGiver, setIsGiver] = useState(false)
  // 設定判斷目前交易進程的 state
  const [deliverStatus, setDeliverStatus] = useState('asking')

  // deliveryStatus = ['asking', 'chargePaying', 'delivering', 'done']

  // 顯示交易進程的 tabs
  // 根據不同進程，顯示 tab 在當下狀態的背景色
  // $isActive: 進行中 | $isDone: 已完成 |
  const renderTabs = () => {
    // 如果目前進程在 "索取中"
    if (deliverStatus === 'asking') {
      return (
        <>
          <StatusTab $isActive="true">索取中</StatusTab>
          <StatusTab>付運費中</StatusTab>
          <StatusTab>寄送中</StatusTab>
          <StatusTab>完成</StatusTab>
        </>
      )
    } // 如果目前進程在 "付運費中"
    else if (deliverStatus === 'chargePaying') {
      return (
        <>
          <StatusTab $isDone="true">索取中</StatusTab>
          <StatusTab $isActive="true">付運費中</StatusTab>
          <StatusTab>寄送中</StatusTab>
          <StatusTab>完成</StatusTab>
        </>
      )
    } // 如果目前進程在 "寄送中"
    else if (deliverStatus === 'delivering') {
      return (
        <>
          <StatusTab $isDone="true">索取中</StatusTab>
          <StatusTab $isDone="true">付運費中</StatusTab>
          <StatusTab $isActive="true">寄送中</StatusTab>
          <StatusTab>完成</StatusTab>
        </>
      )
    } // 如果目前進程在 "完成"
    else if (deliverStatus === 'done') {
      return (
        <>
          <StatusTab $isDone="true">索取中</StatusTab>
          <StatusTab $isDone="true">付運費中</StatusTab>
          <StatusTab $isDone="true">寄送中</StatusTab>
          <StatusTab $isActive="true">完成</StatusTab>
        </>
      )
    }
  }

  // 顯示交易資訊
  // 1. 首先判斷交易方式為 "面交" 或 "店到店"
  // 2. 如果是 "面交"，接著判斷交易的進程，根據不同的進程，顯示相關內容
  // 3. 如果是 "店到店"，接著判斷使用者是 "贈物方"，還是 "索物方"，再根據不同的交易進程，顯示相關內容
  const renderContent = () => {
    // 如果交易方式為 "面交"
    if (faceToFace) {
      // 如果目前進程不為 "完成"，顯示 "面交地點" 與 "面交時間"
      if (deliverStatus !== 'done') {
        return (
          <>
            <Detail>
              面交地點：{DeliveryData.tradingOptions.faceToface.location}
            </Detail>
            <Detail>
              面交時間：{DeliveryData.tradingOptions.faceToface.time}
            </Detail>
          </>
        )
      } // 如果目前進程是 "完成"，顯示交易完成
      else {
        return <Detail>{DeliveryData.tradingOptions.faceToface.done}</Detail>
      }
    } // 如果交易方式為 "店到店"，且使用者為 "贈物者"
    else if (isGiver) {
      // 如果目前進程是 "索取中"
      if (deliverStatus === 'asking') {
        return <Detail>等待對方輸入店到店資訊</Detail>
      } // 如果目前進程是 "付運費中"
      else if (deliverStatus === 'chargePaying') {
        return (
          <>
            <Detail>
              運費：
              {DeliveryData.tradingOptions.convenientStore.chargePaying.charge}
            </Detail>
            <Detail>
              帳號：
              {DeliveryData.tradingOptions.convenientStore.chargePaying.account}
            </Detail>
          </>
        )
      } // 如果目前進程是 "寄送中"
      else if (deliverStatus === 'delivering') {
        return (
          <>
            <Detail>
              姓名：
              {DeliveryData.tradingOptions.convenientStore.delivering.name}
            </Detail>
            <Detail>
              手機：
              {DeliveryData.tradingOptions.convenientStore.delivering.phone}
            </Detail>
            <Detail>
              店名：
              {DeliveryData.tradingOptions.convenientStore.delivering.storeName}
            </Detail>
            <Detail>
              店號：
              {
                DeliveryData.tradingOptions.convenientStore.delivering
                  .storeNumber
              }
            </Detail>
          </>
        )
      } // 如果目前進程是 "完成"
      else if (deliverStatus === 'done') {
        return (
          <Detail>
            {DeliveryData.tradingOptions.convenientStore.done.info}
          </Detail>
        )
      } else {
        return <Detail>Oops! 請與客服聯繫</Detail>
      }
    } // 如果交易方式為 "店到店"，且使用者為 "索物者"
    else {
      // 如果目前進程是 "索取中"
      if (deliverStatus === 'asking') {
        return <Detail>請在下方填入店到店資訊</Detail>
      } // 如果目前進程是 "付運費中"
      else if (deliverStatus === 'chargePaying') {
        return (
          <>
            <Detail>
              運費：
              {DeliveryData.tradingOptions.convenientStore.chargePaying.charge}
            </Detail>
            <Detail>
              帳號：
              {DeliveryData.tradingOptions.convenientStore.chargePaying.account}
            </Detail>
          </>
        )
      } // 如果目前進程是 "寄送中"
      else if (deliverStatus === 'delivering') {
        return (
          <>
            <Detail>
              姓名：
              {DeliveryData.tradingOptions.convenientStore.delivering.name}
            </Detail>
            <Detail>
              手機：
              {DeliveryData.tradingOptions.convenientStore.delivering.phone}
            </Detail>
            <Detail>
              店名：
              {DeliveryData.tradingOptions.convenientStore.delivering.storeName}
            </Detail>
            <Detail>
              店號：
              {
                DeliveryData.tradingOptions.convenientStore.delivering
                  .storeNumber
              }
            </Detail>
          </>
        )
      } // 如果目前進程是 "完成"
      else if (deliverStatus === 'done') {
        return (
          <Detail>{DeliveryData.tradingOptions.convenientStore.done}</Detail>
        )
      } else {
        return <Detail>Oops! 請與客服聯繫</Detail>
      }
    }
  }

  // 顯示交易進程中要填入的欄位、點擊的按鈕
  // 1. 首先判斷交易方式為 "面交" 或 "店到店"
  // 2. 如果是 "面交"，如果交易進程不為 "完成"，再判斷使用者是 "贈物方"，還是 "索物方，顯示相關按鈕
  // 3. 如果是 "店到店"，接著判斷是使用者 "贈物方"，還是 "索物方"，再根據不同的交易進程，顯示相關內容
  const renderBottom = () => {
    // 如果交易方式為 "面交"
    if (faceToFace) {
      // 如果目前進程不為 "完成"，且使用者為 "贈物者"
      if (deliverStatus !== 'done') {
        if (isGiver) {
          return (
            <ButtonsWrapper>
              <DangerButton>取消交易</DangerButton>
            </ButtonsWrapper>
          )
        } // 如果目前進程不為 "完成"，且使用者為 "索物者"
        else {
          return (
            <>
              <ButtonsWrapper>
                <DangerButton>取消交易</DangerButton>
                <Button>收到物品</Button>
              </ButtonsWrapper>
            </>
          )
        }
      } // 如果目前進程為 "完成"，不顯示任何欄位或按鈕
      else {
        return null
      }
    } // 如果交易方式為 "店到店"，且使用者為 "贈物者"
    else if (isGiver) {
      // 如果目前進程是 "索取中"
      if (deliverStatus === 'asking') {
        return (
          <ButtonsWrapper>
            <DangerButton>取消交易</DangerButton>
          </ButtonsWrapper>
        )
      } // 如果目前進程是 "付運費中"
      else if (deliverStatus === 'chargePaying') {
        return (
          <ButtonsWrapper>
            <Button>收到運費</Button>
          </ButtonsWrapper>
        )
      } // 如果目前進程是 "寄送中" 或 "完成"，不顯示任何欄位或按鈕
      else if (deliverStatus === 'delivering' || deliverStatus === 'done') {
        return null
      } else {
        return <Detail>Oops! 請與客服聯繫</Detail>
      }
    } // 如果交易方式為 "店到店"，且使用者為 "贈物者"
    else {
      // 如果目前進程是 "索取中"
      if (deliverStatus === 'asking') {
        return (
          <>
            <InputWrapper>
              <InputText placeholder="姓名" />
              <InputText placeholder="電話" />
              <InputText placeholder="店號" />
              <InputText placeholder="店名" />
            </InputWrapper>
            <ButtonsWrapper>
              <DangerButton>取消交易</DangerButton>
              <Button>確定</Button>
            </ButtonsWrapper>
          </>
        )
      } // 如果目前進程是 "付運費中"
      else if (deliverStatus === 'chargePaying') {
        return (
          <ButtonsWrapper>
            <DangerButton>取消交易</DangerButton>
          </ButtonsWrapper>
        )
      } // 如果目前進程是 "寄送中"
      else if (deliverStatus === 'delivering') {
        return (
          <ButtonsWrapper>
            <Button>收到物品</Button>
          </ButtonsWrapper>
        )
      } // 如果目前進程是 "完成"，不顯示任何欄位或按鈕
      else if (deliverStatus === 'done') {
        return null
      } else {
        return <Detail>Oops! 請與客服聯繫</Detail>
      }
    }
  }

  return (
    <>
      {/* 交易進程的 tabs */}
      <DeliveryStatusTabsWrapper>{renderTabs()}</DeliveryStatusTabsWrapper>
      {/* 交易資訊 */}
      <Content>{renderContent()}</Content>
      {/* 交易進程中所需填入的欄位、點擊的按鈕 */}
      <Bottom>{renderBottom()}</Bottom>
    </>
  )
}

export default DeliveryInfo
