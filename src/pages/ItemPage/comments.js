import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { SmallButton } from '../../components/buttons'
import LargeTextArea from './textArea'

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY_SM} {
    width: 90%;
  }
`
const Comment = styled.div`
  margin-bottom: 50px;
`
const CommentTop = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
`
const CommentNickname = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.primary_300};
`
const GivingGift = styled(SmallButton)``
const CommentContent = styled.div`
  width: 80%;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;

  letter-spacing: 0.5px;
`
const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
`
const CommentTime = styled.div`
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: ${(props) => props.theme.general_500};
`
const CommentUpdates = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  cursor: pointer;
`
const CommentReply = styled.div`
  color: ${(props) => props.theme.primary_300};
  &:hover {
    color: ${(props) => props.theme.primary_250};
  }
`
const CommentEdit = styled.div`
  color: ${(props) => props.theme.primary_300};

  &:hover {
    color: ${(props) => props.theme.primary_250};
  }
`
const CommentDelete = styled.div`
  color: ${(props) => props.theme.danger_100};
  &:hover {
    color: ${(props) => props.theme.danger_000};
  }
`
const SubCommentContainer = styled.div`
  width: 85%;
  margin-bottom: 50px;
  margin-left: 35px;
  padding-left: 10px;
  border-left: 2px solid ${(props) => props.theme.general_300};
`
const SubComment = styled.div`
  margin-bottom: 25px;
`

function comments() {
  return (
    <CommentsContainer>
      <Comment>
        <CommentTop>
          <CommentNickname>Willy</CommentNickname>
          <GivingGift>送他禮物</GivingGift>
        </CommentTop>
        <CommentContent>
          您好，我平常有隨手筆記的習慣，很喜歡這個手帳，盼能獲贈。謝謝分享！
        </CommentContent>
        <CommentBottom>
          <CommentTime>2021/10/14 14:01</CommentTime>
          <CommentUpdates>
            <CommentReply>回覆</CommentReply>
            <CommentEdit> | 編輯留言</CommentEdit>
            <CommentDelete> | 刪除留言</CommentDelete>
          </CommentUpdates>
        </CommentBottom>
        <LargeTextArea></LargeTextArea>
      </Comment>
      <SubCommentContainer>
        <SubComment>
          <CommentTop>
            <CommentNickname>Kimi</CommentNickname>
          </CommentTop>
          <CommentContent>準備寄送囉，記得先付運費哊！</CommentContent>
          <CommentBottom>
            <CommentTime>2021/10/14 14:07</CommentTime>
            <CommentUpdates>
              <CommentReply>回覆</CommentReply>
              <CommentEdit> | 編輯留言</CommentEdit>
              <CommentDelete> | 刪除留言</CommentDelete>
            </CommentUpdates>
          </CommentBottom>
          <LargeTextArea></LargeTextArea>
        </SubComment>
        <SubComment>
          <CommentTop>
            <CommentNickname>Willy</CommentNickname>
          </CommentTop>
          <CommentContent>已付運費囉～ 感謝 </CommentContent>
          <CommentBottom>
            <CommentTime>2021/10/14 14:21</CommentTime>
            <CommentUpdates>
              <CommentReply>回覆</CommentReply>
              <CommentEdit> | 編輯留言</CommentEdit>
              <CommentDelete> | 刪除留言</CommentDelete>
            </CommentUpdates>
          </CommentBottom>
        </SubComment>
      </SubCommentContainer>
    </CommentsContainer>
  )
}

export default comments
