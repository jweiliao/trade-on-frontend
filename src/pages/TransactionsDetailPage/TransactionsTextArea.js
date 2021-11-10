import styled from 'styled-components'
import { SmallButton } from '../../components/buttons'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'

/* Form - 整個區塊 */
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
`

/* TextArea - 輸入留言的地方 */
const TextArea = styled.textarea`
  width: 480px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  border: 1px solid ${(props) => props.theme.general_500};
  outline: none;
  resize: none;
  padding: 15px 15px 15px 30px;
  &:focus {
    border: 1px solid ${(props) => props.theme.general_600};
  }
  ${MEDIA_QUERY_MD} {
    max-width: 90%;
    font-size: 12px;
    padding: 5px 5px 5px 10px;
  }
`

/* MessageSubmitButton - 送出留言的按鈕 */
const MessageSubmitButton = styled(SmallButton)`
  margin: 20px 0;
`

const LargeTextArea = () => {
  return (
    <>
      <Form>
        {/* 輸入留言的地方 */}
        <TextArea
          rows="3"
          maxlength="200"
          placeholder="請輸入您的留言 / 提問"
          required
        ></TextArea>
        {/* 送出留言的按鈕 */}
        <MessageSubmitButton type="submit">送出留言</MessageSubmitButton>
      </Form>
    </>
  )
}

export default LargeTextArea
