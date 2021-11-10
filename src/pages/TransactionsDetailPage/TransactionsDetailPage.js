import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { PageTitle } from '../../components/heading'
import Container from '../../components/Container'
import LargeTextArea from './TransactionsTextArea'
import Comments from './TransactionsComments'
import DeliverInfo from './DeliveryInfo'

/* DetailWrapper - 交易詳情區塊*/
const DetailWrapper = styled.div`
  max-width: 1040px;
  margin-top: 42px;
  padding: 22px 40px;
  border: 1px solid ${(props) => props.theme.general_500};
  border-radius: 4px;
  display: flex;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    padding: 0px;
    padding-left: 10px;
  }
`

/* DetailLeft - 交易詳情左邊全部區塊 */
const DetailLeft = styled.div`
  width: 40%;
  background-color: ${(props) => props.theme.general_100};
  ${MEDIA_QUERY_MD} {
    width: 100%;
    margin-bottom: 50px;
  }
`
/* UserInfo - 贈物者資訊 */
const UserInfo = styled(Link)`
  margin-top: 23px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

/* UserAvatar - 贈物者頭像 */
const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary_200};
`

/* UserNickname - 贈物者暱稱 */
const UserNickname = styled.div`
  margin-top: 11px;
  color: ${(props) => props.theme.primary_300};
`

/* ObjectInfo - 物品資訊的全部區塊 */
const ObjectInfo = styled.div`
  margin: 0 24px 50px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
/* ObjectImage - 物品圖片 */
const ObjectImage = styled.img`
  width: 30%;
  // height: 60px;
  margin-right: 12px;
  background-color: ${(props) => props.theme.primary_200};
  object-fit: cover;
  ${MEDIA_QUERY_MD} {
    width: 70%;
    margin-bottom: 10px;
  }
`
/* ObjectImage - 物品名稱 */
const ObjectName = styled.div`
  max-width: 70%;
  font-size: 24px;
  line-height: 1.5;
  ${MEDIA_QUERY_MD} {
    font-size: 20px;
  }
`

/* DealInfo - 物品名稱 */
const DealInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 24px 50px 24px;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.15px;
`

/* DealCharge - 交易資訊：誰支付運費 */
const DealCharge = styled.div`
  max-width: 115px;
  max-height: 36px;
  margin-bottom: 10px;
  padding: 4px;
  border-radius: 16px;
  color: #ffffff;
  text-align: center;
  background-color: ${(props) => props.theme.primary_300};
`

/*  DealTotalCount - 交易資訊：總數 */
const DealTotalCount = styled.div`
  margin-bottom: 10px;
`

/*  DealNeed - 交易資訊：需求 */
const DealNeed = styled.div`
  margin-bottom: 10px;
`

/*  DealPayment - 交易資訊 */
const DealPayment = styled.div``

/* DetailLeft - 交易詳情右邊全部區塊 */
const DetailRight = styled.div`
  width: 60%;
  margin-left: 11px;
  padding-right: 50px;
  padding-left: 40px;
  border-left: 2px solid ${(props) => props.theme.general_500};

  ${MEDIA_QUERY_MD} {
    width: 100%;
    margin-left: 0;
    padding-left: 15px;
    padding-right: 0px;
  }
`

export default function TransactionsDetailPage() {
  return (
    <>
      <Container>
        {/* 標題 */}
        <PageTitle>交易詳情</PageTitle>

        {/* 交易詳情區塊*/}
        <DetailWrapper>
          {/* 交易詳情左邊 - 物品詳情與交易進程 */}
          <DetailLeft>
            {/* 贈物者資訊 */}
            <UserInfo to="/portfolio">
              {/* 贈物者頭像 */}
              <UserAvatar
                src={`https://source.unsplash.com/user/erondu/`}
              ></UserAvatar>
              {/* 贈物者暱稱 */}
              <UserNickname>@mi2mao2wua</UserNickname>
            </UserInfo>

            {/* 物品資訊 */}
            <ObjectInfo>
              {/* 物品圖片 */}
              <ObjectImage src={`https://source.unsplash.com/random/1`} />
              {/* 物品名稱 */}
              <ObjectName>
                [徵求] 香精油 50 瓶。不挑味道，不限大小，不論期限香精油
              </ObjectName>
            </ObjectInfo>

            {/* 交易資訊 */}
            <DealInfo>
              <DealCharge>刊登者付費</DealCharge>
              <DealTotalCount>總數：1 個</DealTotalCount>
              <DealNeed>需求：1 個</DealNeed>
              <DealPayment>選擇的交易方式： 面交</DealPayment>
            </DealInfo>

            {/* 交易進程 */}
            <DeliverInfo></DeliverInfo>
          </DetailLeft>

          {/* 交易詳情右邊 - 留言板*/}
          <DetailRight>
            {/* 留言內容 */}
            <Comments></Comments>
            {/* 輸入留言 */}
            <LargeTextArea></LargeTextArea>
          </DetailRight>
        </DetailWrapper>
      </Container>
    </>
  )
}
