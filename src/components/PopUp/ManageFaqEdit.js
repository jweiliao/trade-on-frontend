import styled from 'styled-components'
import {
  BackDrop,
  AddFaqWrapper,
  Title,
  AddFaq,
  QuestionInput,
  AnswerInput,
  ConfirmButtonsWrapper,
  CancelButton,
  AddButton,
} from './ManageFaqAdd'
import { InputLabel } from '../textField'

const EditFaqWrapper = styled(AddFaqWrapper)``

const EditFaq = styled(AddFaq)``

const UpdateButton = styled(AddButton)``

export default function ManageFaqEdit({
  handleToggleEditPopUp,
  updateFaqData,
  handleEditInput,
  handleUpdateFaq,
}) {
  return (
    <>
      <BackDrop onClick={handleToggleEditPopUp} />
      <EditFaqWrapper>
        <Title>編輯常見問題</Title>
        <EditFaq>
          <InputLabel>問題</InputLabel>
          <QuestionInput
            name="question"
            placeholder="請輸入問題"
            value={updateFaqData.question}
            onChange={handleEditInput}
          />
          <InputLabel>回答</InputLabel>
          <AnswerInput
            name="answer"
            placeholder="請輸入回答"
            value={updateFaqData.answer}
            onChange={handleEditInput}
          />
        </EditFaq>
        <ConfirmButtonsWrapper>
          <CancelButton onClick={handleToggleEditPopUp}>取消</CancelButton>
          <UpdateButton type="submit" onClick={handleUpdateFaq}>
            更新
          </UpdateButton>
        </ConfirmButtonsWrapper>
      </EditFaqWrapper>
    </>
  )
}
