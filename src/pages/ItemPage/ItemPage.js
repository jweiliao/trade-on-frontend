import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { LargeButton } from '../../components/buttons'

// 引入 react icons
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as ImIcons from 'react-icons/im'

// 引入 AsNavFor （圖片輪播）
import AsNavFor from './AsNavFor'
// 引入 留言
import Comments from './comments'
// 引入填寫留言的區塊
import LargeTextArea from './textArea'

/* 禮物詳情頁最上方 "物品" 資訊的全部區塊 */
const GiftDetails = styled.div`
  width: 960px;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: baseline;
  }
`

/* "物品" 資訊：左側全部的區塊 */
const DetailLeft = styled.div`
  width: 527px;
  height: 626px;

  ${MEDIA_QUERY_SM} {
    margin-bottom: 50px;
  }
`
/* "物品" 資訊：右側全部的區塊 */
const DetailRight = styled.div`
  width: 340px;
  height: 626px;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.15px;

  ${MEDIA_QUERY_SM} {
    margin-bottom: 50px;
  }
`
/* "物品" 資訊右側：贈物者資訊 */
const Donor = styled.div`
  margin-bottom: 38px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

/* 贈物者頭像 */
const DonorAvatar = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 17px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary_200};
`

/* 贈物者暱稱 */
const DonorNickname = styled(Link)`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* "物品" 資訊右側：物品名稱 */
const GiftTitle = styled.div`
  margin-bottom: 40px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${(props) => props.theme.general_500};
  font-size: 26px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* "物品" 資訊右側：物品細節 */
const GiftDetail = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* 每一項物品細節前的 icon */
const Icon = styled.div`
  width: 26px;
  height: 26px;
  color: ${(props) => props.theme.primary_300};
`

/* 每一項物品細節的內容 */
const Label = styled.div`
  margin-left: 17px;
`

/* 分類 */
const Category = styled.li`
  display: flex;
  margin-bottom: 20px;
`

/* 寄送地點 */
const Location = styled.li`
  display: flex;
  margin-bottom: 20px;
`

/* 寄送方式 */
const Delivery = styled.li`
  display: flex;
  margin-bottom: 20px;
`

/* 物品狀態 */
const GiftState = styled.li`
  display: flex;
  margin-bottom: 20px;
`

/* 運費支付 */
const ShippingFee = styled.li`
  display: flex;
  margin-bottom: 20px;
`

/* "編輯禮物" 按鈕 */
const EditGiftButton = styled(LargeButton)`
  margin-top: 25px;
`

/* 禮物詳情頁的 "物品介紹" 區塊 */
const GiftIntro = styled.div`
  max-width: 557px;
  margin: 50px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 2px solid ${(props) => props.theme.general_500};
`
/* 物品介紹的標題 */
const IntroTitle = styled.div`
  border-left: 10px solid ${(props) => props.theme.primary_200};
  padding-left: 17px;
  font-size: 24px;
  margin-bottom: 50px;
`

/* 物品介紹的內文 */
const IntroContent = styled.div`
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin-bottom: 50px;
`

export default function ItemPage() {
  return (
    <>
      <Container>
        {/* 禮物詳情頁最上方的 "物品" 資訊 */}
        <GiftDetails>
          {/* "物品" 資訊：左側 */}
          <DetailLeft>
            {/* 圖片輪播 */}
            <AsNavFor></AsNavFor>
          </DetailLeft>

          {/* "物品" 資訊：右側 */}
          <DetailRight>
            {/* "物品" 資訊右側：贈物者資訊 */}
            <Donor>
              {/* 贈物者頭像 */}
              <DonorAvatar></DonorAvatar>

              {/* 贈物者暱稱 */}
              {/* todo: 連結到贈物者的個人主頁 */}
              <DonorNickname to="#">Kimi</DonorNickname>
            </Donor>

            {/* "物品" 資訊右側：物品名稱 */}
            <GiftTitle>2022 輕便方格手帳 </GiftTitle>

            {/* "物品" 資訊右側：物品細節 */}
            <GiftDetail>
              {/* 分類 */}
              <Category>
                <Icon>
                  <FaIcons.FaTags />
                </Icon>
                <Label>辦公用品</Label>
              </Category>

              {/* 寄送地點 */}
              <Location>
                <Icon>
                  <ImIcons.ImLocation />
                </Icon>
                <Label>新北市板橋區</Label>
              </Location>

              {/* 寄送方式 */}
              <Delivery>
                <Icon>
                  <FaIcons.FaTruckLoading />
                </Icon>
                <Label>寄送方式：面交 / 郵件寄送</Label>
              </Delivery>

              {/* 物品狀態 */}
              <GiftState>
                <Icon>
                  <FaIcons.FaInfoCircle />
                </Icon>
                <Label>物品狀態：二手</Label>
              </GiftState>

              {/* 運費支付 */}
              <ShippingFee>
                <Icon>
                  <MdIcons.MdMonetizationOn />
                </Icon>
                <Label>運費支付：匯運費給贈送者</Label>
              </ShippingFee>
            </GiftDetail>

            {/* "編輯禮物" 按鈕 */}
            <Link to="/givings/edit">
              <EditGiftButton>編輯禮物</EditGiftButton>
            </Link>
          </DetailRight>
        </GiftDetails>

        {/* 禮物詳情頁的 "物品介紹" 區塊 */}
        <GiftIntro>
          {/* 物品介紹的標題 */}
          <IntroTitle>物品介紹 </IntroTitle>
          {/* 物品介紹的內文 */}
          <IntroContent>
            {/* todo: 顯示輸入的文字格式及樣式 */}
            裝訂：線裝裝訂 頁數：76 頁 尺寸：B6 （W128×H186×D6mm） 筆記頁：30 頁
            產地：日本 英國插畫 PIENI 系列聯名，
            可隨身攜帶的輕薄尺寸，隨時記錄下重要預定及備忘。
            因有多的手帳，所以只用過幾次
          </IntroContent>
        </GiftIntro>

        {/* 禮物詳情頁的 "想要禮物" 區塊 */}
        <GiftIntro>
          {/* 想要禮物的標題 */}
          <IntroTitle>想要禮物</IntroTitle>
          {/* 想要禮物的內文 */}
          <IntroContent>目前沒有資料</IntroContent>
          {/* 留言內容 */}
          <Comments></Comments>
          <Comments></Comments>
        </GiftIntro>

        {/* 禮物詳情頁的 "留言" 區塊 */}
        <GiftIntro>
          {/* 留言的標題 */}
          <IntroTitle>留言</IntroTitle>
          {/* 留言的內文 */}
          <IntroContent>目前沒有資料</IntroContent>
          {/* 留言內容 */}
          <Comments></Comments>
          {/* 填寫留言的區塊 */}
          <LargeTextArea></LargeTextArea>
        </GiftIntro>
      </Container>
    </>
  )
}
