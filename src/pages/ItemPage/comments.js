import React, { useContext, useState } from 'react'
import AuthContext from '../../contexts'
import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { SmallButton } from '../../components/buttons'
import LargeTextArea from './textArea'

// 引入操作留言的 hook
import useComments from '../../hooks/useComments'

// 引入 "給與物品" 彈窗的 hook
import useGiveItemPopup from '../../hooks/useGiveItemPopup'

// 引入操作 "給與物品" 彈窗 "確認" 按鈕的 hook
import useGiveItem from '../../hooks/useGiveItem'

// 引入 "給他禮物" 按鈕點擊後的彈窗 component
import ManageGiveItem from '../../components/ManageGiveItem'

import ManageWantItem from '../../components/ManageWantItem'

/* CommentsContainer - 留言的整個區塊 */
const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${MEDIA_QUERY_SM} {
    // width: 90%;
  }
`

/* 物品介紹的內文 */
const IntroContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin-top: 30px;
  margin-bottom: 50px;
`

/*  Comment - 主留言 */
const Comment = styled.div`
  margin-bottom: 50px;
  width: 100%;
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
  // width: 80%;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  white-space: pre-line;
`

/* CommentBottom - 留言的最下方 */
const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  // 如果完成交易，則不可回覆、編輯、刪除留言
  ${({ postIsGoal }) =>
    postIsGoal &&
    `
      pointer-events: none;
      opacity: 0.4;
    `}
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
  width: 90%;
  margin-bottom: 50px;
  margin-left: 54px;
  padding-left: 10px;
  border-left: 2px solid ${(props) => props.theme.general_300};
`

/* SubComment - 子留言 */
const SubComment = styled.div`
  margin-bottom: 25px;
`

/* EditWrapper - 編輯留言的全部區塊 */
const EditWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`

/* EditInput - 編輯留言的輸入框 */
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

/* ButtonsWrapper - 編輯留言的按鈕們 */
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

/* SaveBtn - 編輯留言的 "送出" 按鈕 */
const SaveBtn = styled(SmallButton)`
  margin: 1rem;
  background-color: ${(props) => props.theme.primary_100};
  &:hover {
    background-color: ${(props) => props.theme.primary_150};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

/* CancelBtn - 編輯留言的 "取消編輯" 按鈕 */
const CancelBtn = styled(SaveBtn)`
  background-color: ${(props) => props.theme.general_100};
  &:hover {
    background-color: ${(props) => props.theme.general_200};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

export function Comments({
  isApplyMessage,
  post,
  postMessageId,
  postAuthorId,
  postIsGoal,
  isDealLimit,
  setIsDealLimit,
  addNewComment,
  wantPopUp,
  handleToggleWantPopUp,
}) {
  // 拿到 登入後的使用者資料
  const { user } = useContext(AuthContext)

  const {
    mainMsgs,
    relatedMsgs,
    applyMainMsgs,
    applyRelatedMsgs,
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
    isReplying,
    handleAddQuestionSubmit,
    applyMsgs,
    setApplyMsgs,
    handleAddNewApplySubmit,
  } = useComments(isApplyMessage, postMessageId)

  const [applyMsgIsDealing, setApplyMsgIsDealing] = useState(false)
  // 從 useGiveItemPopup 中引入 givePopUp, handleToggleGivePopUp,applyMsgId
  const { givePopUp, handleToggleGivePopUp, applyMsgId, applyMsgDealMethod } =
    useGiveItemPopup()

  // 從 useGiveItem 中引入 isDealing
  // const { applyMsgIsDealing } = useGiveItem(
  //   handleToggleGivePopUp,
  //   applyMsgId,
  //   setApplyMsgIsDealing
  // )

  // console.log('isDealing', applyMsgIsDealing)
  return (
    <CommentsContainer>
      {/* 點擊 "想要禮物" 按鈕後,顯示申請索取的彈出視窗 */}
      {wantPopUp && (
        <ManageWantItem
          isApplyMessage={isApplyMessage}
          post={post}
          postMessageId={postMessageId}
          handleToggleWantPopUp={handleToggleWantPopUp}
          applyMsgs={applyMsgs}
          setApplyMsgs={setApplyMsgs}
          handleAddNewApplySubmit={handleAddNewApplySubmit}
        />
      )}
      {/* 如果 givePopUp 的 state 為 true，顯示 "贈與物品"的彈窗，並帶入所需的 props 值 */}
      {givePopUp && (
        <ManageGiveItem
          isApplyMessage={isApplyMessage}
          post={post}
          postMessageId={post.id}
          applyDealMethod={applyMsgDealMethod}
          handleToggleGivePopUp={handleToggleGivePopUp}
          applyMsgId={applyMsgId}
          isDealLimit={isDealLimit}
          setIsDealLimit={setIsDealLimit}
          setApplyMsgIsDealing={setApplyMsgIsDealing}
        />
      )}
      {/* 填寫詢問留言的區塊，登入後顯示並可留言 */}
      {user ? (
        !isApplyMessage ? (
          <LargeTextArea
            isApplyMessage={isApplyMessage}
            post={post}
            newMessageInput={newMessageInput}
            setNewMessageInput={setNewMessageInput}
            addNewComment={addNewComment}
            handleAddQuestionSubmit={handleAddQuestionSubmit}
            postIsGoal={post.isGoal}
          ></LargeTextArea>
        ) : null
      ) : null}
      {/* 主留言 */}
      {/* 判斷是否有留言，且留言為請求索取，還是提問；
      有留言時顯示留言，否則顯示 "目前沒有資料" */}
      {JSON.stringify(isApplyMessageOrNot(applyMainMsgs, mainMsgs)) === '{}' ? (
        <IntroContent>目前沒有資料</IntroContent>
      ) : (
        isApplyMessageOrNot(applyMainMsgs, mainMsgs).length === 0 && (
          <IntroContent>目前沒有資料</IntroContent>
        )
      )}
      {isApplyMessageOrNot(applyMainMsgs, mainMsgs).length > 0 &&
        isApplyMessageOrNot(applyMainMsgs, mainMsgs).map((msg) => (
          <>
            <Comment key={msg.id}>
              {/* 留言最上方 */}
              <CommentTop>
                {/* 留言最上方的留言者暱稱 */}
                <CommentNickname>{msg.author.nickname}</CommentNickname>
                {/* "送他禮物" 按鈕 */}
                {/* 在"想要禮物" 區塊內"，如果登入者為發文者，若還未成立了交易。，顯示 "送他禮物" 按鈕，否則顯示 "物品贈送中" 按鈕 */}
                {/* 如果登入者非發問者，不顯示任何按鈕 */}
                {user && user.id === postAuthorId
                  ? isApplyMessage &&
                    (msg.isDealing ? (
                      // 後端資料顯示 isDealing 為 true，disable "物品贈送中" 按鈕，讓它不執行任何操作
                      <GivingGift disabled={true}>物品贈送中</GivingGift>
                    ) : applyMsgIsDealing === msg.id ? (
                      // 贈與物品彈窗 "確認" 按鈕點擊並成功進入交易後，disable "物品贈送中" 按鈕，讓它不執行任何操作
                      <GivingGift disabled={true}>物品贈送中</GivingGift>
                    ) : (
                      // 若物品不在交易中，點擊 "送他禮物" 按鈕後，執行 handleToggleGivePopUp 並帶入 message 的 id、applyDealMethod
                      <GivingGift
                        onClick={() =>
                          handleToggleGivePopUp(msg.id, msg.applyDealMethod)
                        }
                      >
                        送他禮物
                      </GivingGift>
                    ))
                  : null}
              </CommentTop>

              {/* 留言的留言內容 */}
              {/* 判斷是否為編輯該留言，是的話，則顯示編輯的輸入框以及按鈕 */}
              {isUpdating === msg.id ? (
                <EditWrapper>
                  <EditInput
                    id={msg.id}
                    onChange={(e) => {
                      setEditValue(e.target.value)
                    }}
                    defaultValue={editValue ? editValue : msg.content}
                    type="text"
                  />
                  <ButtonsWrapper>
                    <SaveBtn
                      editValue={editValue}
                      id={msg.id}
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
              <CommentBottom postIsGoal={postIsGoal}>
                <CommentTime>{msg.lastModified}</CommentTime>
                {/* 留言的最下方的留言更新區塊 */}
                {/* 登入者可以回覆留言，登入者為該留言者時才可以編輯、刪除該留言 */}
                {user && (
                  <CommentUpdates>
                    <CommentReply onClick={() => handleMainMsgReply(msg.id)}>
                      回覆
                    </CommentReply>
                    {user.id === msg.author._id ? (
                      <>
                        <CommentEdit onClick={() => setIsUpdating(msg.id)}>
                          {' '}
                          | 編輯留言
                        </CommentEdit>
                        <CommentDelete
                          onClick={() =>
                            handleDeleteMessage(msg.id, msg.isDealing)
                          }
                        >
                          | 刪除留言
                        </CommentDelete>
                      </>
                    ) : null}
                  </CommentUpdates>
                )}
              </CommentBottom>

              {/* 輸入留言的區塊 */}
              {/* 點擊 "回覆" 時，顯示輸入留言的區塊 */}
              {showMainTextArea && isReplying === msg.id && (
                <LargeTextArea
                  newMessageInput={newMessageInput}
                  setNewMessageInput={setNewMessageInput}
                  relatedMsg={msg.id}
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
                    msg.id === subMsg.relatedMsg ? (
                      <SubComment key={subMsg.id}>
                        <CommentTop>
                          <CommentNickname>
                            {subMsg.author.nickname}
                          </CommentNickname>
                        </CommentTop>

                        {/* 留言的留言內容 */}
                        {isUpdating === subMsg.id ? (
                          <EditWrapper>
                            <EditInput
                              id={subMsg.id}
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
                                id={subMsg.id}
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
                          <CommentTime>{subMsg.lastModified}</CommentTime>
                          {user && (
                            <CommentUpdates>
                              <CommentReply
                                onClick={() => handleSubMsgReply(subMsg.id)}
                              >
                                回覆
                              </CommentReply>
                              {user && user.id === subMsg.author._id ? (
                                <>
                                  <CommentEdit
                                    onClick={() => setIsUpdating(subMsg.id)}
                                  >
                                    | 編輯留言
                                  </CommentEdit>
                                  <CommentDelete
                                    onClick={() =>
                                      handleDeleteMessage(
                                        subMsg.id,
                                        subMsg.isDealing
                                      )
                                    }
                                  >
                                    | 刪除留言
                                  </CommentDelete>
                                </>
                              ) : null}
                            </CommentUpdates>
                          )}
                        </CommentBottom>

                        {/* 輸入子留言的區塊 */}
                        {showSubTextArea && isReplying === subMsg.id && (
                          <LargeTextArea
                            newMessageInput={newMessageInput}
                            setNewMessageInput={setNewMessageInput}
                            relatedMsg={msg.id}
                            isApplyMessage={isApplyMessage}
                            handleReplySubmit={handleReplySubmit}
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
