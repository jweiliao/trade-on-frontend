import styled from 'styled-components'
import { SmallButton } from '../../components/buttons'

const Form = styled.div`
  // position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`
const TextArea = styled.textarea`
  width: 557px;
  height: 156px;
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
`
const MessageSubmitButton = styled(SmallButton)`
  margin: 5px 0;
`

const LargeTextArea = () => {
  return (
    <>
      <Form>
        <TextArea placeholder="請輸入您的留言 / 提問" required></TextArea>
        <MessageSubmitButton type="submit">送出留言</MessageSubmitButton>
      </Form>
    </>
  )
}
export default LargeTextArea
