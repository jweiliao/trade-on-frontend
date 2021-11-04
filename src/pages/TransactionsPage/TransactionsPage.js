import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import { TextTab, BorderTab } from '../../components/tabs'
import {
  SmallButton,
  DangerSmallButton,
  PageButton,
} from '../../components/buttons'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'

const ActionTabsWrapper = styled.div`
  margin: 3rem 0 2rem;
  display: flex;
  justify-content: center;
  text-align: center;
`
const ActionTab = styled(TextTab)`
  font-size: 1.5rem;
  text-align: center;
  margin: 0 2rem;
  width: 3.5rem;
`

const RecordsWrapper = styled.div`
  border: ${(props) => props.theme.general_300} solid 1px;
  border-top: 0px;
  padding: 2rem 8% 3rem;
  min-height: 50vh;
`

const StatusTabsWrapper = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
`

const StatusTab = styled(BorderTab)`
  min-width: 9rem;
  overflow: auto;
`

const Record = styled.div`
  :not(:first-child) {
    border-top: ${(props) => props.theme.general_500} solid 1px;
  }
  padding: 2rem 0;
`

const User = styled.p`
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: content-box;
  flex-wrap: wrap;
  ${MEDIA_QUERY_MD} {
    flex-direction: row-reverse;
  }
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

const ImgWrapper = styled.div`
  width: 10rem;
  height: 7rem;
  margin-right: 2rem;
  position: relative;
  ${MEDIA_QUERY_MD} {
    margin: 0;
  }
`

const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30rem;
  ${MEDIA_QUERY_MD} {
    width: 22rem;
  }
  ${MEDIA_QUERY_SM} {
    margin-top: 1.8rem;
    width: 100%;
    height: 7.5rem;
  }
`

const Tag = styled.p`
  background: ${(props) => props.theme.primary_300};
  color: ${(props) => props.theme.general_000};
  width: 6.5rem;
  padding: 0.4rem;
  border-radius: 1rem;
  text-align: center;
  ${MEDIA_QUERY_SM} {
    margin: 0 auto;
  }
`

const Detail = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${MEDIA_QUERY_SM} {
    text-align: center;
  }
`

const ButtonsWrapper = styled.div`
  ${MEDIA_QUERY_MD} {
    display: flex;
    margin: 1.8rem auto 0rem;
  }
  ${MEDIA_QUERY_SM} {
    display: block;
  }
`

const Button = styled(SmallButton)`
  margin-bottom: 2.5rem;
  ${MEDIA_QUERY_MD} {
    width: 8rem;
    margin-bottom: 0rem;
    margin-right: 6rem;
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-bottom: 1rem;
  }
`

const DangerButton = styled(DangerSmallButton)`
  ${MEDIA_QUERY_MD} {
    width: 8rem;
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const PaginationWrapper = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4.5rem;
`

export default function TransactionsPage() {
  return (
    <Container>
      <PageTitle>交易紀錄</PageTitle>
      <ActionTabsWrapper>
        <ActionTab to="/transactions" $isActive="true">
          贈物
        </ActionTab>
        <ActionTab to="/transactions">索物 </ActionTab>
      </ActionTabsWrapper>
      <StatusTabsWrapper>
        <StatusTab>刊登中（0）</StatusTab>
        <StatusTab>索取中（0）</StatusTab>
        <StatusTab>付運費中（0）</StatusTab>
        <StatusTab $isActive="true">寄送中（0）</StatusTab>
        <StatusTab>完成（0）</StatusTab>
      </StatusTabsWrapper>
      <RecordsWrapper>
        <Record>
          <User>暱稱</User>
          <ContentWrapper>
            <ImgWrapper>
              <Img src={`https://source.unsplash.com/random/1`} />
            </ImgWrapper>
            <TextWrapper>
              <Tag>刊登者付費</Tag>
              <Detail>物品名稱</Detail>
              <Detail>總數：1 個</Detail>
              <Detail>已送出：1 個</Detail>
            </TextWrapper>
            <ButtonsWrapper>
              <Button>交易詳情</Button>
              <DangerButton>取消交易</DangerButton>
            </ButtonsWrapper>
          </ContentWrapper>
        </Record>
        <PaginationWrapper>
          <PageButton>&lt;</PageButton>
          <PageButton>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>&gt;</PageButton>
        </PaginationWrapper>
      </RecordsWrapper>
    </Container>
  )
}
