import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { SmallButton } from '../../components/buttons'
import LargeTextArea from './textArea'
import { BackstageSmallButton } from '../../components/buttons'
// import {
//   getPost,
//   getAllMessages,
//   getPostMessage,
//   deleteMessage,
//   updateMessage,
//   replayMessage,
//   addMessage,
// } from '../../WebAPI'

import useComments from '../../hooks/useComments'

/* CommentsContainer - 留言的整個區塊 */
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY_SM} {
    width: 90%;
  }
`

/* 物品介紹的內文 */
const IntroContent = styled.div``

/*  Comment - 主留言 */
const Comment = styled.div`
  margin-bottom: 50px;
`

/* CommentTop - 留言最上方 */
const CommentTop = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
`

/* CommentNickname - 留言最上方的留言者暱稱 */
const CommentNickname = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.primary_300};
`

/* GivingGift - "送他禮物" 按鈕 */
const GivingGift = styled(SmallButton)``

/* CommentContent - 留言的留言內容 */
const CommentContent = styled.div`
  width: 80%;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;

  letter-spacing: 0.5px;
`

/* CommentBottom - 留言的最下方 */
const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
`

/* CommentTime - 留言的最下方的發送留言時間 */
const CommentTime = styled.div`
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: ${(props) => props.theme.general_500};
`

/* CommentUpdates - 留言的最下方的留言更新區塊 */
const CommentUpdates = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  cursor: pointer;
`

/* CommentReply - 留言的最下方的回覆留言 */
const CommentReply = styled.div`
  color: ${(props) => props.theme.primary_300};
  &:hover {
    color: ${(props) => props.theme.primary_250};
  }
`

/* CommentEdit - 留言的最下方的編輯留言 */
const CommentEdit = styled.div`
  color: ${(props) => props.theme.primary_300};

  &:hover {
    color: ${(props) => props.theme.primary_250};
  }
`

/* CommentDelete - 留言的最下方的刪除留言 */
const CommentDelete = styled.div`
  color: ${(props) => props.theme.danger_100};
  &:hover {
    color: ${(props) => props.theme.danger_000};
  }
`

/* SubCommentContainer - 子留言全部區塊 */
const SubCommentContainer = styled.div`
  width: 85%;
  margin-bottom: 50px;
  margin-left: 35px;
  padding-left: 10px;
  border-left: 2px solid ${(props) => props.theme.general_300};
`

/* SubComment - 子留言 */
const SubComment = styled.div`
  margin-bottom: 25px;
`

const EditInput = styled.input`
  font-size: 14px;
  &:focus {
    outline: none;
  }
  border: ${(props) => props.theme.general_200} solid 2px;
  border-radius: 4px;
  margin-top: 10px;
  line-height: 1.5em;
  // padding-left: 5px;
  // min-width: 80%;
  padding: 5px;
  background: ${(props) => props.theme.general_100};
  ${MEDIA_QUERY_SM} {
    min-width: 40%;
  }
`

const EditWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const SaveBtn = styled(BackstageSmallButton)`
  // margin: 1rem 2rem;
  margin: 1rem;
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const CancelBtn = styled(SaveBtn)`
  background-color: ${(props) => props.theme.general_100};
  &:hover {
    background-color: ${(props) => props.theme.general_200};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const Content = styled.div`
  margin: 5px 0 8px 0;
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  white-space: pre-line;
`

export function Comments({ isApplyMessage, postMessageId }) {
  const {
    questionMsgs,
    setQuestionMsgs,
    mainMsgs,
    setMainMsgs,
    applyMsgs,
    relatedMsgs,
    setRelatedMsgs,
    setApplyMsgs,
    applyMainMsgs,
    setApplyMainMsgs,
    applyRelatedMsgs,
    setApplyRelatedMsgs,
    isUpdating,
    setIsUpdating,
    editValue,
    setEditValue,
    handleEditMsg,
    handleDeleteMessage,
    handleMainMsgReply,
    handleSubMsgReply,
    showMainTextArea,
    showSubTextArea,
    isApplyMessageOrNot,
    newMessageInput,
    setNewMessageInput,
    handleReplySubmit,
  } = useComments(isApplyMessage, postMessageId)

  return (
    <CommentsContainer>
      {/* 主留言 */}
      {/* 判斷是否有留言 */}
      {JSON.stringify(isApplyMessageOrNot(applyMainMsgs, mainMsgs)) ===
        '{}' && <IntroContent>目前沒有資料</IntroContent>}
      {isApplyMessageOrNot(applyMainMsgs, mainMsgs).length > 0 &&
        isApplyMessageOrNot(applyMainMsgs, mainMsgs).map((msg) => (
          <>
            <Comment key={msg._id}>
              {/* 留言最上方 */}
              <CommentTop>
                {/* 留言最上方的留言者暱稱 */}
                <CommentNickname>{msg.ownerInfo[0].nickname}</CommentNickname>

                {/* "送他禮物" 按鈕 */}
                {isApplyMessage && <GivingGift>送他禮物</GivingGift>}
              </CommentTop>

              {/* 留言的留言內容 */}
              {isUpdating === msg._id ? (
                <EditWrapper>
                  <EditInput
                    id={msg._id}
                    onChange={(e) => {
                      setEditValue(e.target.value)
                    }}
                    defaultValue={editValue ? editValue : msg.content}
                    type="text"
                  />
                  <ButtonsWrapper>
                    <SaveBtn
                      editValue={editValue}
                      id={msg._id}
                      onClick={(e) => {
                        handleEditMsg(e)
                      }}
                    >
                      送出
                    </SaveBtn>
                    <CancelBtn
                      editValue={!editValue}
                      onClick={() => {
                        setIsUpdating(false)
                        setEditValue('')
                      }}
                    >
                      取消編輯
                    </CancelBtn>
                  </ButtonsWrapper>
                </EditWrapper>
              ) : (
                <CommentContent>{msg.content}</CommentContent>
              )}

              {/* 留言的最下方 */}
              <CommentBottom>
                <CommentTime>{msg.updatedAt}</CommentTime>

                {/* 留言的最下方的留言更新區塊 */}
                <CommentUpdates>
                  <CommentReply onClick={handleMainMsgReply}>回覆</CommentReply>
                  <CommentEdit onClick={() => setIsUpdating(msg._id)}>
                    {' '}
                    | 編輯留言
                  </CommentEdit>
                  <CommentDelete onClick={() => handleDeleteMessage(msg._id)}>
                    | 刪除留言
                  </CommentDelete>
                </CommentUpdates>
              </CommentBottom>

              {/* 輸入留言的區塊 */}
              {showMainTextArea && (
                <LargeTextArea
                  newMessageInput={newMessageInput}
                  setNewMessageInput={setNewMessageInput}
                  relatedMsg={msg._id}
                  isApplyMessage={isApplyMessage}
                  handleReplySubmit={handleReplySubmit}
                ></LargeTextArea>
              )}
            </Comment>

            {/* 子留言全部區塊 */}
            <SubCommentContainer>
              {/* 子留言 */}
              {isApplyMessageOrNot(applyRelatedMsgs, relatedMsgs).length > 0 &&
                isApplyMessageOrNot(applyRelatedMsgs, relatedMsgs).map(
                  (subMsg) =>
                    msg._id === subMsg.relatedMsg ? (
                      <SubComment key={subMsg._id}>
                        <CommentTop>
                          <CommentNickname>
                            {subMsg.ownerInfo[0].nickname}
                          </CommentNickname>
                        </CommentTop>

                        {/* 留言的留言內容 */}
                        {isUpdating === subMsg._id ? (
                          <EditWrapper>
                            <EditInput
                              id={subMsg._id}
                              onChange={(e) => {
                                setEditValue(e.target.value)
                              }}
                              defaultValue={
                                editValue ? editValue : subMsg.content
                              }
                              type="text"
                            />
                            <ButtonsWrapper>
                              <SaveBtn
                                editValue={editValue}
                                id={subMsg._id}
                                onClick={(e) => {
                                  handleEditMsg(e)
                                }}
                              >
                                送出
                              </SaveBtn>
                              <CancelBtn
                                editValue={!editValue}
                                onClick={() => {
                                  setIsUpdating(false)
                                  setEditValue('')
                                }}
                              >
                                取消編輯
                              </CancelBtn>
                            </ButtonsWrapper>
                          </EditWrapper>
                        ) : (
                          <CommentContent>{subMsg.content}</CommentContent>
                        )}

                        <CommentBottom>
                          <CommentTime>{subMsg.updatedAt}</CommentTime>
                          <CommentUpdates>
                            <CommentReply onClick={handleSubMsgReply}>
                              回覆
                            </CommentReply>
                            <CommentEdit
                              onClick={() => setIsUpdating(subMsg._id)}
                            >
                              | 編輯留言
                            </CommentEdit>
                            <CommentDelete
                              onClick={() => handleDeleteMessage(subMsg._id)}
                            >
                              | 刪除留言
                            </CommentDelete>
                          </CommentUpdates>
                        </CommentBottom>

                        {/* 輸入子留言的區塊 */}
                        {showSubTextArea && (
                          <LargeTextArea
                            newMessageInput={newMessageInput}
                            setNewMessageInput={setNewMessageInput}
                            relatedMsg={subMsg._id}
                            handleSubmit={handleReplySubmit}
                          ></LargeTextArea>
                        )}
                      </SubComment>
                    ) : null
                )}
            </SubCommentContainer>
          </>
        ))}
    </CommentsContainer>
  )
}
