import styled from 'styled-components'
import { Textarea } from '../../components/textField'
import { SmallButton } from '../../components/buttons'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const TextArea = styled(Textarea)`
  width: 100%;
  height: 6rem;
`

const MessageSubmitButton = styled(SmallButton)`
  margin-top: 1rem;
`

const MessageTextArea = ({
  value,
  handleMessageInput,
  handleKeyPress,
  handleSubmit,
  isTextAreaDisabled,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        name="content"
        placeholder="請輸入留言內容"
        onKeyDown={handleKeyPress}
        value={value}
        onChange={handleMessageInput}
      ></TextArea>
      <MessageSubmitButton type="submit" disabled={isTextAreaDisabled}>
        傳送
      </MessageSubmitButton>
    </Form>
  )
}

export default MessageTextArea
