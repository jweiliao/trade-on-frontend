import React, { useState, useContext } from 'react'
import AuthContext from '../../contexts'
import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { SmallButton } from '../../components/buttons'
import LargeTextArea from './textArea'

// 引入操作留言的 hook
import useComments from '../../hooks/useComments'

// 引入操作 "給他禮物" 按鈕的 hook
import useGiveItem from '../../hooks/useGiveItem'

// 引入 "給他禮物" 按鈕點擊後的彈窗 component
import ManageGiveItem from '../../components/ManageGiveItem'

/* CommentsContainer - 留言的整個區塊 */
const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${MEDIA_QUERY_SM} {
    // width: 90%;
  }
`

/* 物品介紹的內文 */
const IntroContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
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
  } = useComments(isApplyMessage, postMessageId)

  // 帶入 useGiveItem 中的 givePopUp, handleToggleGivePopUp,applyMsgId
  const { givePopUp, handleToggleGivePopUp, applyMsgId } = useGiveItem()

  // 設定 isAccept 的 state：當 "送他禮物" 的按鈕執行且彈窗資料填入成功後，state 更新為 true
  const [isAccept, setIsAccept] = useState(false)

  return (
    <CommentsContainer>
      {/* 主留言 */}
      {/* 判斷是否有留言，且留言為請求索取，還是提問；
      有留言時顯示留言，否則顯示 "目前沒有資料" */}
      {JSON.stringify(isApplyMessageOrNot(applyMainMsgs, mainMsgs)) ===
        '{}' && <IntroContent>目前沒有資料</IntroContent>}
      {isApplyMessageOrNot(applyMainMsgs, mainMsgs).length > 0 &&
        isApplyMessageOrNot(applyMainMsgs, mainMsgs).map((msg) => (
          <>
            <Comment key={msg.id}>
              {/* 留言最上方 */}
              <CommentTop>
                {/* 留言最上方的留言者暱稱 */}
                <CommentNickname>{msg.author.nickname}</CommentNickname>
                {/* "送他禮物" 按鈕 */}
                {/* 在"想要禮物" 區塊內"，如果登入者為發文者，若還未完成贈送，顯示 "送他禮物" 按鈕，否則顯示 "已贈送" 按鈕 */}
                {/* 如果登入者非發問者，不顯示任何按鈕 */}
                {user && user.id === postAuthorId
                  ? isApplyMessage &&
                    (isAccept ? (
                      // disable "已贈送" 按鈕，讓它不執行任何操作
                      <GivingGift disabled={true}>已贈送</GivingGift>
                    ) : (
                      // 點擊 "送他禮物" 按鈕後，執行 handleToggleGivePopUp 並帶入 message 的 id
                      <GivingGift onClick={() => handleToggleGivePopUp(msg.id)}>
                        送他禮物
                      </GivingGift>
                    ))
                  : null}
                {/* 如果 givePopUp 的 state 為 true，顯示 "送他禮物"的彈窗，並帶入所需的 props 值 */}
                {givePopUp && (
                  <ManageGiveItem
                    isApplyMessage={isApplyMessage}
                    post={post}
                    postMessageId={post.id}
                    applyDealMethod={msg.applyDealMethod}
                    handleToggleGivePopUp={handleToggleGivePopUp}
                    applyMsgId={applyMsgId}
                    isAccept={isAccept}
                    setIsAccept={setIsAccept}
                  />
                )}
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
                          onClick={() => handleDeleteMessage(msg.id)}
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
                                      handleDeleteMessage(subMsg.id)
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
