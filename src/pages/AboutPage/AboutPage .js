import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import aboutBanner from '../../images/aboutBanner.svg'

/* 關於我們頁整個區塊 */
const AboutPageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

/* 關於我們頁上方 banner - 圖片 */
const AboutUsBanner = styled.div`
  background-image: url(${aboutBanner});
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 358px;
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

/* AboutPageTitle - 標題 */
const AboutPageTitle = styled(PageTitle)`
  color: ${(props) => props.theme.primary_200};
`

/* Block - 內文區塊 */
const Block = styled.div`
  margin: 40px auto;
`

/* Paragraph - 段落 */
const Paragraph = styled.div`
  padding: 0px auto;
  font-size: 16px;
  line-height: 2;
  letter-spacing: 0.5px;
  text-align: center;
`

/* ParagraphList - 特點條列 */
const ParagraphList = styled(Paragraph)`
  margin-top: 20px;
`

/* HighLight - 特點 hight light 且粗體 */
const HighLight = styled.b`
  color: ${(props) => props.theme.primary_200};
  font-size: 18px;
  letter-spacing: 2px;
`

export default function AboutPage() {
  return (
    <AboutPageContainer>
      {/* 關於我們頁上方 banner 圖片 */}
      <AboutUsBanner />

      {/* 標題 */}
      <AboutPageTitle>關於 Trade On </AboutPageTitle>
      {/* 內文區塊 */}
      <Block>
        {/* 段落 */}
        <Paragraph>
          讓正在斷捨離物品的你，專注在選擇真正珍惜物品的人，
        </Paragraph>
        <Paragraph
          style={{
            textAlign: 'left',
            marginBottom: '50px',
          }}
        >
          其他的事，就由 Trade On 來協助吧！
        </Paragraph>

        {/* ParagraphList - 特點條列 */}
        <ParagraphList>
          <HighLight>資訊清晰</HighLight>
          <Paragraph>讓使用者按照一定的格式發文與回應</Paragraph>
        </ParagraphList>

        {/* ParagraphList - 特點條列 */}
        <ParagraphList>
          <HighLight>方便聯繫</HighLight>
          <Paragraph>給物過程提供留言板交流</Paragraph>
        </ParagraphList>

        {/* ParagraphList - 特點條列 */}
        <ParagraphList>
          <HighLight>管理交易</HighLight>
          <Paragraph>更棒的是，還能紀錄每一筆的交易情況</Paragraph>
        </ParagraphList>
      </Block>
    </AboutPageContainer>
  )
}
