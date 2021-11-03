import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { MediumButton } from '../../components/buttons'
import Container from '../../components/Container'

// 首頁最上方大圖
import homebanner from '../../images/homeBanner.svg'
// 首頁中間的禮物圖示
import gift from '../../images/homeGift.svg'
// 首頁關於我們的圖片
import homeintro from '../../images/homeIntro.svg'

// 引入 Carousel.js
import Carousel from '../../components/Carousel/Carousel'

/* 首頁上方 banner */
const HomeBanner = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    margin-top: 50px;
    flex-direction: column;
  }
`

/* 首頁 banner - 左側整個文字元件 */
const BannerText = styled.div`
  padding-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    margin-bottom: 50px;
    padding-right: 0px;
  }
`

/* 首頁 banner - 左側文字標題 */
const BannerTitle = styled.div`
  font-size: 72px;
  font-weight: 700;
  line-height: 108px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.primary_200};

  ${MEDIA_QUERY_MD} {
    margin-bottom: 20px;
  }
`

/* 首頁 banner - 左側文字副標題 */
const BannerSubTitle = styled.div`
  padding-top: 5px;
  font-size: 25px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 2px;
  color: ${(props) => props.theme.primary_200}; ;
`

/* 首頁 banner - 右側圖片 */
const BannerImage = styled.img``

/* 首頁中間 "我想送禮物" - 整個元件 */
const HomeGift = styled.div`
  height: 500px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
/* 首頁中間 "我想送禮物" - 圖片 */
const GiftImage = styled.img``

/* 首頁中間 "我想送禮物" - 文字的連接 */
const GiftTitle = styled(Link)`
  margin-top: 20px;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: ${(props) => props.theme.secondary};

  &:hover {
    color: ${(props) => props.theme.primary_200};
  }
`

/* 首頁中間的介紹 - 整個元件 */
const HomeIntro = styled.div`
  padding: 30px; 37px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`

/* 首頁中間的介紹 - 左邊整個元件 */
const HomeIntroLeft = styled.div`
  margin-left: 55px;
  width: 427px;
  height: 427px;
`
/* 首頁中間的介紹 - 左邊的圖片 */
const IntroImage = styled.img``

/* 首頁中間的介紹 - 右邊整個元件 */
const HomeIntrolRight = styled.div`
  margin-left: 72px;
  width: 430px;
  height: 430px;

  ${MEDIA_QUERY_SM} {
    margin-top: 50px;
  }
`
/* 首頁中間的介紹 - 右邊文字標題 */
const IntroTitle = styled.div`
  font-weight: 500;
  font-size: 26px;
  line-height: 39px;
  letter-spacing: 0.5px;
`

/* 首頁中間的介紹 - 右邊文字內容 */
const IntroContent = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  padding-right: 10px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.5px;
`

/* 首頁下方的物品推薦  */
const HomeRecommended = styled.div`
  padding: 72px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function HomePage() {
  return (
    <>
      {/* 首頁最上方的 banner 區塊 */}
      <HomeBanner>
        {/* banner 左側的文字 */}
        <BannerText>
          <BannerTitle>Trade On</BannerTitle>
          <BannerSubTitle>美好的事物值得繼續傳遞</BannerSubTitle>
        </BannerText>
        {/* banner 右側的圖片 */}
        <BannerImage src={homebanner} />
      </HomeBanner>
      <Container>
        {/* 首頁中間的 "我想送禮物" 區塊 */}
        <HomeGift>
          {/* "我想送禮物" 上方圖片*/}
          <Link to="/givings">
            <GiftImage src={gift} />
          </Link>
          {/* "我想送禮物" 下方文字*/}
          <GiftTitle to="/givings">我想送禮物</GiftTitle>
        </HomeGift>

        {/* 首頁中間的 "介紹" 區塊*/}
        <HomeIntro>
          {/* "介紹" 左側的圖片 */}
          <HomeIntroLeft>
            <IntroImage src={homeintro} />
          </HomeIntroLeft>

          {/* "介紹" 右側的文字 */}
          <HomeIntrolRight>
            <IntroTitle>想斷捨離，卻不知如何處理物品嗎？</IntroTitle>
            <IntroContent>
              <p>我們相信，每個曾經陪伴過的物品，都有值得傳遞的故事與價值</p>
              <br />
              <p>有時，你只是在尋找下一個懂得珍惜它的人。</p>
            </IntroContent>

            {/* "介紹"右側文字下方的按鈕 */}
            <Link to="/about">
              <MediumButton>了解更多</MediumButton>
            </Link>
          </HomeIntrolRight>
        </HomeIntro>

        {/* 首頁最下方的推薦物品區塊 */}
        <HomeRecommended>
          {/* 引入 Carousel.js 的 components */}
          <Carousel></Carousel>
        </HomeRecommended>
      </Container>
    </>
  )
}
