import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import { Img, ImgWrapper, ImgCircleWrapper } from '../../components/img'
import { SmallButton, DangerSmallButton } from '../../components/buttons'
import BehaviorTab from '../../components/Tab/BehaviorTab'
import StatusTab from '../../components/Tab/StatusTab'
import Pagination from '../../components/Pagination/Pagination'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'
import shippingMethod from '../../constants/shippingMethod'
import dealStatus from '../../constants/dealStatus'
import useTransactions from '../../hooks/useTransactions'

const Transactions = styled.div`
  border: ${(props) => props.theme.general_300} solid 1px;
  border-top: 0px;
  border-radius: 0px 0px 4px 4px;
  padding: 2rem 8% 0;
  min-height: 50vh;
`

const Transaction = styled.div`
  :not(:first-child) {
    border-top: ${(props) => props.theme.general_500} solid 1px;
  }
  padding: 2rem 0;
  &:last-of-type {
    margin-bottom: 3rem;
  }
`

const User = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`

const Avatar = styled(ImgCircleWrapper)`
  position: relative;
  display: inline-block;
  min-width: 1.5rem;
  min-height: 1.5rem;
`

const Email = styled.p`
  margin-left: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primary_300};
`

const Nickname = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primary_300};
`

const ContentAndButtons = styled.div`
  display: flex;
  justify-content: space-between;
  ${MEDIA_QUERY_MD} {
    display: block;
  }
`

const Content = styled.div`
  display: flex;
  overflow: auto;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`

const PostImg = styled(ImgWrapper)`
  min-width: 7rem;
  min-height: 7rem;
  margin-right: 2rem;
  ${MEDIA_QUERY_MD} {
    position: relative;
    left: 0;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 7rem;
    max-height: 7rem;
    margin: 0 auto 1rem;
  }
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ItemName = styled.p`
  line-height: 1.5;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 33rem;
  ${MEDIA_QUERY_MD} {
    max-width: none;
  }
`

const Quantity = styled(ItemName)`
  font-weight: normal;
`

const TradeMode = styled(Quantity)``

const Number = styled(Quantity)``

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2rem;
  ${MEDIA_QUERY_MD} {
    margin: 1rem 0 0;
    width: 100%;
    flex-direction: row;
  }
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

const TransactionsDetailLink = styled(SmallButton)`
  ${MEDIA_QUERY_MD} {
    width: 100%;
    margin: 0 1rem;
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
    max-width: 19rem;
    margin-bottom: 1rem;
  }
`

const CancelDealBtn = styled(DangerSmallButton)`
  ${MEDIA_QUERY_MD} {
    width: 100%;
    margin: 0 1rem;
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
    max-width: 19rem;
    margin: 0;
  }
`

export default function TransactionsPage() {
  const { toFillInfo, toCharge, delivering, isCompleted, isCanceled } =
    dealStatus
  const statusData = [toFillInfo, toCharge, delivering, isCompleted, isCanceled]
  const { faceToFace, sevenEleven, familyMart } = shippingMethod
  const {
    scrollRef,
    filterTransactions,
    currentTransactions,
    give,
    behaviorFilter,
    handleChangeBehavior,
    statusFilter,
    handleChangeStatus,
    handleCancelDeal,
    transactionsPerPage,
    currentPage,
    handleChangePage,
  } = useTransactions()

  return (
    <Container>
      <PageTitle>交易紀錄</PageTitle>
      <BehaviorTab
        handleChangeBehavior={handleChangeBehavior}
        behaviorFilter={behaviorFilter}
        scrollRef={scrollRef}
      />
      <StatusTab
        statusData={statusData}
        handleChangeStatus={handleChangeStatus}
        statusFilter={statusFilter}
      />
      <Transactions>
        {currentTransactions.map((transaction) => {
          return (
            <Transaction key={transaction.id}>
              <User>
                <Avatar>
                  <Img
                    src={
                      behaviorFilter === give
                        ? transaction.dealer.avatarUrl.imgUrl
                        : transaction.owner.avatarUrl.imgUrl
                    }
                  />
                </Avatar>
                <Email>
                  {behaviorFilter === give
                    ? transaction.dealer.email
                    : transaction.owner.email}
                </Email>
                <Nickname>
                  {behaviorFilter === give
                    ? transaction.dealer.nickname &&
                      `(${transaction.dealer.nickname})`
                    : transaction.owner.nickname &&
                      `(${transaction.owner.nickname})`}
                </Nickname>
              </User>
              <ContentAndButtons>
                <Content>
                  <PostImg>
                    <Img src={transaction.post.imgUrls[0].imgUrl} />
                  </PostImg>
                  <Detail>
                    <ItemName>{transaction.post.itemName}</ItemName>
                    <Quantity>數量：{transaction.amount}</Quantity>
                    <TradeMode>
                      交易方式：
                      {(transaction.dealMethod.faceToFace && faceToFace) ||
                        (transaction.dealMethod.convenientStore === '全家'
                          ? familyMart
                          : sevenEleven)}
                    </TradeMode>
                    <Number>交易編號：{transaction.id}</Number>
                  </Detail>
                </Content>
                <Buttons>
                  <TransactionsDetailLink
                    as={Link}
                    to={`/transactions/${transaction.id}`}
                  >
                    交易詳情
                  </TransactionsDetailLink>
                  {(statusFilter === toFillInfo ||
                    (statusFilter === delivering &&
                      transaction.dealMethod.faceToFace)) && (
                    <CancelDealBtn
                      onClick={() => handleCancelDeal(transaction.id)}
                    >
                      取消交易
                    </CancelDealBtn>
                  )}
                </Buttons>
              </ContentAndButtons>
            </Transaction>
          )
        })}
        <Pagination
          dataPerPage={transactionsPerPage}
          totalData={filterTransactions.length}
          handleChangePage={handleChangePage}
          currentPage={currentPage}
        />
      </Transactions>
    </Container>
  )
}
