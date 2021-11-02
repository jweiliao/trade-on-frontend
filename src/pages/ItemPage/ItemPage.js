import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { LargeButton } from '../../components/buttons'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as ImIcons from 'react-icons/im'

const GiftDetails = styled.div`
  width: 960px;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: baseline;
  }
`
const DetailLeft = styled.div`
  width: 527px;
  height: 626px;
  margin-right: 95px;
  background-color: grey;
  ${MEDIA_QUERY_SM} {
    margin-bottom: 50px;
  }
`

const Carousel = styled.div``

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

const Donor = styled.div`
  margin-bottom: 38px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const DonorAvatar = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 17px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary_200};
`
const DonorNickname = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

const GiftTitle = styled.div`
  margin-bottom: 40px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${(props) => props.theme.general_500};
  font-size: 26px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

const GiftDetail = styled.ul`
  display: flex;
  margin-bottom: 50px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`
const Icon = styled.div``
const Label = styled.div``
const Category = styled.li`
  margin-bottom: 25px;
`
const Location = styled.li`
  margin-bottom: 25px;
`
const Delivery = styled.li`
  margin-bottom: 25px;
`
const GiftState = styled.li`
  margin-bottom: 25px;
`
const ShippingFee = styled.li`
  margin-bottom: 25px;
`

const EditGiftButton = styled(LargeButton)``

const GiftIntro = styled.div`
  width: 557px;
  margin: 50px; auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 2px solid ${(props) => props.theme.general_500};
`
const IntroTitle = styled.div`
  border-left: 10px solid ${(props) => props.theme.primary_200};
  padding-left: 17px;
  font-size: 24px;
  margin-bottom: 50px;
`
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
      <GiftDetails>
        <DetailLeft>
          <Carousel></Carousel>
        </DetailLeft>

        <DetailRight>
          <Donor>
            <DonorAvatar></DonorAvatar>
            <DonorNickname>Kimi</DonorNickname>
          </Donor>

          <GiftTitle>2022 輕便方格手帳 </GiftTitle>

          <GiftDetail>
            <Category>
              <Icon>
                <FaIcons.FaTags />
              </Icon>
              <Label>辦公用品</Label>
            </Category>

            <Location>
              <ImIcons.ImLocation />
              新北市板橋區
            </Location>

            <Delivery>
              <FaIcons.FaTruckLoading />
              寄送方式：面交 / 郵件寄送
            </Delivery>

            <GiftState>
              <FaIcons.FaInfoCircle />
              物品狀態：二手
            </GiftState>

            <ShippingFee>
              <MdIcons.MdMonetizationOn />
              運費支付：匯運費給贈送者
            </ShippingFee>
          </GiftDetail>

          <EditGiftButton>編輯禮物</EditGiftButton>
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
      </GiftIntro>

      {/* 禮物詳情頁的 "留言" 區塊 */}
      <GiftIntro>
        {/* 留言的標題 */}
        <IntroTitle>留言</IntroTitle>
        {/* 留言的內文 */}
        <IntroContent>目前沒有資料</IntroContent>
        {/* todo：留言區塊 */}
      </GiftIntro>
    </>
  )
}
