import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import AuthContext from '../../contexts'

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 39.5rem;
  background-color: ${(props) => props.theme.general_100};
  border-radius: 4px;
  padding: 1rem 0.5rem;
  overflow: auto;
`

const DayWrapper = styled.div`
  :not(:first-of-type) {
    margin-top: 1rem;
  }
  display: flex;
  justify-content: center;
`

const Day = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  border-radius: 1rem;
  padding: 0.15rem 0.5rem;
  background-color: ${(props) => props.theme.general_500};
  color: ${(props) => props.theme.general_000};
`

const MessageWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: ${({ $isMyself }) => {
    return $isMyself ? 'flex-end' : 'flex-start'
  }};
`

const Message = styled.div`
  max-width: 90%;
  display: flex;
  ${({ $isMyself }) => {
    return !$isMyself && ' flex-direction: row-reverse;'
  }}
`

const Content = styled.p`
  display: inline-block;
  padding: 0.5rem 0.8rem;
  line-height: 1.5;
  white-space: pre-line;
  border-radius: 1.5rem;
  background: ${({ $isMyself }) => {
    return $isMyself
      ? (props) => props.theme.primary_100
      : (props) => props.theme.general_200
  }};
  ${({ $isMyself }) => {
    return $isMyself ? 'margin-left: 0.4rem;' : 'margin-right: 0.4rem;'
  }};
`

const DeletedContent = styled.span`
  font-style: italic;
  color: ${(props) => props.theme.general_500};
`

const TimeAndBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`

const Time = styled.p`
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${(props) => props.theme.general_500};
`

const DeleteBtn = styled.p`
  font-size: 0.8rem;
  cursor: pointer;
  color: ${(props) => props.theme.danger_000};
  &:hover {
    color: ${(props) => props.theme.danger_100};
  }
  ${({ $isMyself }) => {
    return !$isMyself && 'display:none'
  }}
`

export default function Messages({ days, messages, handleDeleteMessage }) {
  const {
    user: { id: userId },
  } = useContext(AuthContext)
  const containerRef = useRef(null)

  useEffect(() => {
    const messageContainer = containerRef.current
    messageContainer.scroll({
      top: messageContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <MessageContainer ref={containerRef}>
      {days.map((day, index) => {
        return (
          <React.Fragment key={index}>
            <DayWrapper>
              <Day>{day}</Day>
            </DayWrapper>
            {messages.map((message) => {
              return (
                <React.Fragment key={message.id}>
                  {day === message.createdAt.split(' ')[0] && (
                    <MessageWrapper $isMyself={message.author._id === userId}>
                      <Message $isMyself={message.author._id === userId}>
                        <TimeAndBtn>
                          {!message.isDeleted && (
                            <DeleteBtn
                              $isMyself={message.author._id === userId}
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              刪除
                            </DeleteBtn>
                          )}
                          <Time>{message.createdAt.split(' ')[1]}</Time>
                        </TimeAndBtn>
                        <Content $isMyself={message.author._id === userId}>
                          {message.isDeleted ? (
                            <DeletedContent>此則留言已被刪除</DeletedContent>
                          ) : (
                            message.content
                          )}
                        </Content>
                      </Message>
                    </MessageWrapper>
                  )}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )
      })}
    </MessageContainer>
  )
}
