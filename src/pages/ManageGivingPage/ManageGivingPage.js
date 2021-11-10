import styled from 'styled-components'
import { BackstageTitle } from '../../components/heading'
import { DangerSmallButton, PageButton } from '../../components/buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

const Title = styled(BackstageTitle)``

const Table = styled.table`
  border-collapse: collapse;
  margin: 1rem auto;
  width: 95%;
  table-layout: fixed;
`

const Head = styled.thead`
  ${MEDIA_QUERY_SM} {
    display: none;
  }
`

const Row = styled.tr`
  border: 0.065rem solid ${(props) => props.theme.general_400};
  border-right: 0px;
  border-left: 0px;
  ${MEDIA_QUERY_SM} {
    border: 0.1rem solid ${(props) => props.theme.general_500};
    border-right: 0px;
    border-left: 0px;
    display: block;
    margin-bottom: 2em;
  }
`

const Heading = styled.th`
  padding: 0.625rem;
  text-align: center;
  font-size: 1.125rem;
  letter-spacing: 0.1rem;
`

const Body = styled.tbody``

const Data = styled.td`
  padding: 0.625em;
  text-align: center;
  line-height: 1.2;
  overflow: auto;
  position: relative;
  ${MEDIA_QUERY_SM} {
    display: block;
    font-size: 1rem;
    text-align: right;
    padding-left: 5rem;
    ::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    :last-child {
      border-bottom: 0;
    }
  }
`

const ButtonWrapper = styled(Data)`
  ${MEDIA_QUERY_SM} {
    padding-left: 0;
  }
`

const DeleteBtn = styled(DangerSmallButton)`
  margin: 0 auto;
`
const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`

export default function ManageGivingPage() {
  return (
    <>
      <Title>贈物文管理</Title>
      <Table>
        <Head>
          <Row>
            <Heading>帳號</Heading>
            <Heading>暱稱</Heading>
            <Heading>物品名稱</Heading>
            <Heading>物品介紹</Heading>
            <Heading>上架時間</Heading>
            <Heading></Heading>
          </Row>
        </Head>
        <Body>
          <Row>
            <Data data-label="帳號">jane0901</Data>
            <Data data-label="暱稱">Jane</Data>
            <Data data-label="物品名稱">蒸氣清潔拖</Data>
            <Data data-label="物品介紹">
              家裡閒置的雜物，希望可以讓物品被使用 很好用哦～打掃好幫手！
            </Data>
            <Data data-label="上架時間">2021/10/11 23:31</Data>
            <ButtonWrapper>
              <DeleteBtn>刪除</DeleteBtn>
            </ButtonWrapper>
          </Row>
          <Row>
            <Data data-label="帳號">jane0901</Data>
            <Data data-label="暱稱">Jane</Data>
            <Data data-label="物品名稱">花瓶</Data>
            <Data data-label="物品介紹">就是個花瓶</Data>
            <Data data-label="上架時間">2021/10/11 23:31</Data>
            <ButtonWrapper>
              <DeleteBtn>刪除</DeleteBtn>
            </ButtonWrapper>
          </Row>
        </Body>
      </Table>
      <PaginationWrapper>
        <PageButton>&lt;</PageButton>
        <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>&gt;</PageButton>
      </PaginationWrapper>
    </>
  )
}
