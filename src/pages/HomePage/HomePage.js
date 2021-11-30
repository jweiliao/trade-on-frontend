import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { MediumButton } from '../../components/buttons'
import Container from '../../components/Container'
import homebanner from '../../images/homeBanner.svg'
import homeintro from '../../images/homeIntro.svg'
import Carousel from '../../components/Carousel/Carousel'

const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7rem;
  ${MEDIA_QUERY_MD} {
    flex-direction: column-reverse;
    margin-bottom: 5rem;
  }
`

const BannerTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  flex: 1;
  ${MEDIA_QUERY_MD} {
    margin: 3rem 0 0;
  }
`

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0 0 2rem;
  letter-spacing: 0.2rem;
  color: ${(props) => props.theme.primary_200};
  ${MEDIA_QUERY_MD} {
    display: none;
  }
`

const SubTitle = styled.h2`
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.primary_200};
`

const BannerImgWrapper = styled.div`
  flex: 2;
  width: 100%;
  ${MEDIA_QUERY_MD} {
    max-width: 44rem;
    flex: 1;
  }
`

const BannerImage = styled.img`
  width: 100%;
`

const HomeRecommended = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
`

const Intro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`

const IntroImgWrapper = styled.div`
  margin-right: 4rem;
  ${MEDIA_QUERY_MD} {
    margin: 0 0 3rem;
  }
`

const IntroImage = styled.img`
  width: 100%;
`

const IntroTextWrapper = styled.div``

const IntroTitle = styled(SubTitle)``

const IntroContent = styled.p`
  margin: 2rem 0;
  font-size: 1.125rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

const GivingPageButton = styled(MediumButton)`
  ${MEDIA_QUERY_MD} {
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;
  }
`

export default function HomePage() {
  return (
    <Container>
      <Banner>
        <BannerTextWrapper>
          <Title>Trade On</Title>
          <SubTitle>美好的事物值得繼續傳遞</SubTitle>
        </BannerTextWrapper>
        <BannerImgWrapper>
          <BannerImage src={homebanner} />
        </BannerImgWrapper>
      </Banner>
      <HomeRecommended>
        <Carousel></Carousel>
      </HomeRecommended>
      <Intro>
        <IntroImgWrapper>
          <IntroImage src={homeintro} />
        </IntroImgWrapper>
        <IntroTextWrapper>
          <IntroTitle>想斷捨離，卻不知如何處理物品嗎？</IntroTitle>
          <IntroContent>
            我們相信，每一個曾經陪伴過的物品，都有值得延續的故事與價值。
            <br />
            <br />
            有時，你只是在尋找下一個懂得珍惜它的人。
          </IntroContent>
          <GivingPageButton as={Link} to="/givings">
            送禮物
          </GivingPageButton>
        </IntroTextWrapper>
      </Intro>
    </Container>
  )
}
