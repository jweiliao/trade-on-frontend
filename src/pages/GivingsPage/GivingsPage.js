import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { MediumButton } from '../../components/buttons'
import Container from '../../components/Container'
import ProgressiveImage from 'react-progressive-graceful-image'

// 禮物頁最上方大圖
import givingsbanner from '../../images/givingsBanner.svg'

/* 禮物上方 banner */
const GivingsBanner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    margin-top: 50px;

    // 文字在上，圖在下
    flex-direction: column-reverse;
  }
`

/* 禮物頁 banner - 右側整個文字元件 */
const BannerText = styled.div`
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    margin-bottom: 50px;
    padding-left: 0px;
  }
`

/* 禮物頁 banner - 右側文字標題 */
const BannerTitle = styled.div`
  font-size: 72px;
  font-weight: 700;
  line-height: 108px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.primary_200};
`

/* 禮物頁 banner - 右側文字副標題 */
const BannerSubTitle = styled.div`
  padding-top: 5px;
  font-size: 25px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 2px;
  color: ${(props) => props.theme.primary_200}; ;
`

/* 禮物頁 banner - 左側圖片 */
const BannerImage = styled.img`
  margin-right: 20px;

  ${MEDIA_QUERY_MD} {
    margin-top: 50px;
    margin-right: 0;
    margin-bottom: 50px;
  }
`

/* 禮物頁中間 "禮物區" - 整個元件 */
const GivingArea = styled.div`
  margin-top: 50px;
  margin-bottom: 84px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.secondary};
`

/* 禮物頁中間 "禮物區" - 標題 */
const GivingTitle = styled.div`
  width: 336px;
  height: 60px;
  background: ${(props) => props.theme.primary_100};
  font-size: 26px;
  line-height: 1.5
  letter-spacing: 0.5px;
  text-align: center;
  line-height:60px
`

/* 禮物頁中間 "禮物區" - 副標題 */
const GivingSubtitle = styled.div`
  margin-top: 22px;
  font-size: 16px;
  line-height: 1.5
  letter-spacing: 0.5px;
`

/* 禮物頁中間 "禮物區" - 上傳禮物的按鈕 */
const UploadGiftButton = styled(MediumButton)`
  line-height: 1.5;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 30px;
`
/* 禮物頁中間 "所有禮物" - 整個元件 */
const GivingCards = styled.div`
  margin: 0 auto;
  margin-bottom: 84px;
  width: 860px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  ${MEDIA_QUERY_MD} {
    width: 430px;
    justify-content: center;
  }
`

/* Cards - 卡片的整個元件 */
const Cards = styled.div`
  margin-right: 10px;
  margin-bottom: 40px;
`

/* Card - 每一個卡片的內容 */
const Card = styled.div`
  width: 200px;
  height: 250px;
  text-align: center;
  opacity: 1;
  color: rgb(165, 41, 41);
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: rgb(244, 245, 244);
`

/* CardImage - 卡片中上方圖片 */
const CardImage = styled.img`
  width: 100%;
  height: 200px;
  display: block;
  margin: auto;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
  &:hover {
    opacity: 0.5;
    transition: all 0.5s ease 0s;
  }
`

/* CardContent - 卡片中的下方整個區塊 */
const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border: solid 1px #d3d4d6;
  border-top: none;
  border-radius: 0 0 20px 20px;
`

/* CardTitle - 卡片下方區塊的文字 */
const CardTitle = styled.div`
  color: #272343;
  display: block;
  overflow: hidden;
  font-size: 14px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
`

/* 禮物頁最下方 "分頁" - 整個元件 */
const PaginationContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  color: ${(props) => props.theme.primary_300};
`

/* 禮物頁下方 "分頁" - 分頁按鈕 */
const PageButton = styled.li`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  border: solid 1px ${(props) => props.theme.general_500};

  &:hover {
    background-color: ${(props) => props.theme.primary_100};
  }
`
const BackgroundBlur = styled.div`
  background-color: #fff3b3;
  height: 200px;
  width: 200px;
  border-radius: 20px 20px 0 0;
  filter: blur(4px);
`
// 圖片預載入處理
const placeholder = <BackgroundBlur />

export default function GivingsPage() {
  // 建立 recommended 的 state，儲存到時候後端傳來的推薦物品資料
  const [recommended, setRecommended] = useState([])

  // 第一次進入頁面時，撈後端資料，並帶入 recommended 的 state
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data)
      })
  }, [])

  return (
    <>
      {/* 禮物頁最上方的 banner 區塊 */}
      <GivingsBanner>
        {/* banner 左側的圖片 */}
        <BannerImage src={givingsbanner} />
        {/* banner 右側的文字 */}
        <BannerText>
          <BannerTitle>Trade On</BannerTitle>
          <BannerSubTitle>目前上架中的禮物有...</BannerSubTitle>
        </BannerText>
      </GivingsBanner>
      <Container>
        {/* 禮物頁中間的 "禮物區" 區塊 */}
        <GivingArea>
          <GivingTitle>禮物區</GivingTitle>
          <GivingSubtitle>快來把這些物品索取回家吧</GivingSubtitle>
          <Link to="/givings/add">
            <UploadGiftButton>上傳禮物</UploadGiftButton>
          </Link>
        </GivingArea>

        {/* 禮物頁中間的 "所有禮物" 區塊 */}
        <GivingCards>
          {recommended.map((current) => (
            // cards - 包住所有卡片的元件
            <Cards key={current.id}>
              {/* card - 每一個卡片的內容 */}
              <Card>
                {/* 將卡片的連接設為此物品的物品詳細頁*/}
                <Link to={`/givings/${current.id}`}>
                  {/* 圖片 */}
                  <ProgressiveImage
                    src={`https://source.unsplash.com/random/${current.id}`}
                    placeholder=""
                  >
                    {(src, loading) => {
                      return loading ? (
                        placeholder
                      ) : (
                        <CardImage src={src} alt="an alternative text" />
                      )
                    }}
                  </ProgressiveImage>
                  {/* 文字內容 */}
                  <CardContent>
                    <CardTitle>{current.username}</CardTitle>
                  </CardContent>
                </Link>
              </Card>
            </Cards>
          ))}
        </GivingCards>

        {/* 顯示頁數 */}
        <PaginationContainer>
          {/* 顯示頁數按鈕 */}
          <PageButton>&lt;</PageButton>
          <PageButton>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>&gt;</PageButton>
        </PaginationContainer>
      </Container>
    </>
  )
}
