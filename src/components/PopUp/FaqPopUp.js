import styled from 'styled-components'
import Backdrop from './Backdrop'
import PopUp from './PopUp'
import { InputLabel, Input, Textarea, InputErrorMessage } from '../textField'
import { PageTitle } from '../heading'
import { BackstageSmallButton, GraySmallButton } from '../buttons'

const Form = styled.form``

const InputArea = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FaqQuestion = styled(Input)`
  width: 100%;
`

const FaqAnswer = styled(Textarea)`
  width: 100%;
  height: 9rem;
`

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const CancelButton = styled(GraySmallButton)``

const SubmitButton = styled(BackstageSmallButton)`
  margin-left: 1rem;
`

export default function FaqPopUp(props) {
  return (
    <>
      <Backdrop onClick={props.handleTogglePopUp} />
      <PopUp>
        <Form onSubmit={props.handleSubmit}>
          <PageTitle>{props.faqData.id ? '編輯' : '新增'}常見問題</PageTitle>
          <InputArea>
            <InputLabel>問題</InputLabel>
            <FaqQuestion
              name="question"
              placeholder="請輸入問題"
              value={props.faqData ? props.faqData.question : null}
              onChange={props.handleInput}
              isWarning={props.errorMessages.question}
            />
            {props.errorMessages.question && (
              <InputErrorMessage>
                {props.errorMessages.question}
              </InputErrorMessage>
            )}
            <InputLabel>回答</InputLabel>
            <FaqAnswer
              name="answer"
              placeholder="請輸入回答"
              value={props.faqData ? props.faqData.answer : null}
              onChange={props.handleInput}
              isWarning={props.errorMessages.answer}
            />
            {props.errorMessages.answer && (
              <InputErrorMessage>
                {props.errorMessages.answer}
              </InputErrorMessage>
            )}
          </InputArea>
          <ConfirmButtons>
            <CancelButton type="button" onClick={props.handleTogglePopUp}>
              取消
            </CancelButton>
            <SubmitButton type="submit">
              {props.faqData.id ? '更新' : '新增'}
            </SubmitButton>
          </ConfirmButtons>
        </Form>
      </PopUp>
    </>
  )
}
