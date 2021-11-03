import React from 'react'
import styled from 'styled-components'
import { SmallButton } from '../../components/buttons'
const CommentsContainer = styled.div`
  display: flex;
`
const Comment = styled.div``
const CommentTop = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CommentNickname = styled.div`
  color: ${(props) => props.theme.primary_300};
`
const GivingGift = styled(SmallButton)``
const CommentContent = styled.div``
const CommentBottom = styled.div``
const CommentTime = styled.div``
const CommentUpdates = styled.div``
const CommentReply = styled.div``
const CommentEdit = styled.div``
const CommentDelete = styled.div``

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
      </Comment>
    </CommentsContainer>
  )
}

export default comments
