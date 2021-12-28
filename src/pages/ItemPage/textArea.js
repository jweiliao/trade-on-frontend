import { useState } from 'react'
import styled from 'styled-components'
import { SmallButton } from '../../components/buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

/* Form - 整個區塊 */
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
  margin-bottom: 50px;
`

/* TextArea - 輸入留言的地方 */
const TextArea = styled.textarea`
  width: 557px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  border: 1px solid ${(props) => props.theme.general_500};
  outline: none;
  resize: none;
  padding: 15px;
  padding-left: 30px;
  &:focus {
    border: 1px solid ${(props) => props.theme.general_600};
  }
  ${MEDIA_QUERY_SM} {
    max-width: 80%;
  }
`
/* MessageSubmitButton - 送出留言的按鈕 */
const MessageSubmitButton = styled(SmallButton)`
  margin: 5px 0;
`

const LargeTextArea = ({
  newMessageInput,
  setNewMessageInput,
  handleReplySubmit,
  handleSubmit,
  addNewComment,
  relatedMsg,
  isApplyMessage,
  post,
}) => {
  return (
    <>
      <Form>
        {/* 輸入留言的地方 */}
        <TextArea
          rows="3"
          maxlength="200"
          placeholder="請輸入您的留言 / 提問"
          name="addNewMessage"
          value={newMessageInput}
          onChange={(e) => setNewMessageInput(e.target.value)}
          required
        ></TextArea>

        {/* 送出留言的按鈕 */}
        <MessageSubmitButton
          type="submit"
          onClick={() =>
            addNewComment
              ? handleSubmit(post, newMessageInput, setNewMessageInput)
              : handleReplySubmit(relatedMsg, isApplyMessage)
          }
        >
          送出留言
        </MessageSubmitButton>
      </Form>
    </>
  )
}

export default LargeTextArea
