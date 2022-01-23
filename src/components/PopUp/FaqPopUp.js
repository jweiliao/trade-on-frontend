import styled from 'styled-components'
import { InputLabel, Input, Textarea, InputErrorMessage } from '../textField'
import { BackstageTitle } from '../heading'
import { SmallButton } from '../buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

const Form = styled.form`
  z-index: 100;
  width: 500px;
  padding: 10px 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid ${(props) => props.theme.general_500};
  border-radius: 4px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-out;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    max-width: 80%;
  }
`

const Title = styled(BackstageTitle)`
  ${MEDIA_QUERY_SM} {
    margin-top: 3rem;
  }
`

const InputArea = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 30px;
`

const FaqQuestion = styled(Input)`
  width: 100%;
`

const FaqAnswer = styled(Textarea)`
  width: 100%;
  height: 7.5rem;
`

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

const CancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const SubmitButton = styled(SmallButton)`
  margin-left: 27px;
  background-color: ${(props) => props.theme.secondary_100};
  :hover {
    background-color: ${(props) => props.theme.secondary_200};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
`

export default function FaqPopUp({
  handleTogglePopUp,
  handleInput,
  handleSubmit,
  faqData,
  errorMessages,
}) {
  return (
    <>
      <BackDrop onClick={handleTogglePopUp} />
      <Form onSubmit={handleSubmit}>
        <Title>{faqData.id ? '編輯' : '新增'}常見問題</Title>
        <InputArea>
          <InputLabel>問題</InputLabel>
          <FaqQuestion
            name="question"
            placeholder="請輸入問題"
            value={faqData ? faqData.question : null}
            onChange={handleInput}
            isWarning={errorMessages.question}
          />
          {errorMessages.question && (
            <InputErrorMessage>{errorMessages.question}</InputErrorMessage>
          )}
          <InputLabel>回答</InputLabel>
          <FaqAnswer
            name="answer"
            placeholder="請輸入回答"
            value={faqData ? faqData.answer : null}
            onChange={handleInput}
            isWarning={errorMessages.answer}
          />
          {errorMessages.answer && (
            <InputErrorMessage>{errorMessages.answer}</InputErrorMessage>
          )}
        </InputArea>
        <ConfirmButtons>
          <CancelButton type="button" onClick={handleTogglePopUp}>
            取消
          </CancelButton>
          <SubmitButton type="submit">
            {faqData.id ? '更新' : '新增'}
          </SubmitButton>
        </ConfirmButtons>
      </Form>
    </>
  )
}
