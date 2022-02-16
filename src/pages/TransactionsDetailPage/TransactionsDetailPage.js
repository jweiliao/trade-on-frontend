import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { PageTitle } from '../../components/heading'
import Container from '../../components/Container'
import User from './User'
import DealInfo from './DealInfo'
import DealProcess from './DealProcess'
import DeliverInfo from './DeliveryInfo'
import UpdateButtons from './UpdateButtons'
import MessageTextArea from './MessageTextArea'
import Messages from './Messages'
import useTradeRecord from '../../hooks/useTradeRecord'
import useDealMessage from '../../hooks/useDealMessage'

const DetailWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.general_300};
  border-radius: 4px;
  margin-top: 3rem;
  padding: 1.5rem;
`

const Content = styled.div`
  display: flex;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`

const InfoWrapper = styled.div`
  flex: 0.9;
`

const MessageWrapper = styled.div`
  flex: 1;
  border-left: 1px solid ${(props) => props.theme.general_300};
  margin-left: 1.5rem;
  padding-left: 1.5rem;
  ${MEDIA_QUERY_MD} {
    width: 100%;
    border-left: none;
    border-top: 1px solid ${(props) => props.theme.general_300};
    margin: 2rem auto 0;
    padding: 1rem 0 0;
  }
`

export default function TransactionsDetailPage() {
  const {
    isGiver,
    status,
    otherUser,
    tradeRecord,
    errorMessages,
    shippingInfo,
    handleCancelDeal,
    handleChange,
    handelUpdateStatus,
  } = useTradeRecord()
  const {
    value,
    isTextAreaDisabled,
    days,
    messages,
    handleMessageInput,
    handleKeyPress,
    handleSubmit,
    handleDeleteMessage,
  } = useDealMessage()

  return (
    <Container>
      <PageTitle>交易詳情</PageTitle>
      <DetailWrapper>
        <User user={otherUser} />
        <Content>
          <InfoWrapper>
            <DealInfo transaction={tradeRecord} />
            <DealProcess status={status} />
            <DeliverInfo
              isGiver={isGiver}
              status={status}
              tradeRecord={tradeRecord}
              errorMessages={errorMessages}
              shippingInfo={shippingInfo}
              handleChange={handleChange}
            />
            <UpdateButtons
              isGiver={isGiver}
              status={status}
              tradeRecord={tradeRecord}
              handelUpdateStatus={handelUpdateStatus}
              handleCancelDeal={handleCancelDeal}
            />
          </InfoWrapper>
          <MessageWrapper>
            <Messages
              days={days}
              messages={messages}
              handleDeleteMessage={handleDeleteMessage}
            />
            <MessageTextArea
              value={value}
              handleMessageInput={handleMessageInput}
              handleKeyPress={handleKeyPress}
              handleSubmit={handleSubmit}
              isTextAreaDisabled={isTextAreaDisabled}
            />
          </MessageWrapper>
        </Content>
      </DetailWrapper>
    </Container>
  )
}
