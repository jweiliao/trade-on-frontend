import styled from 'styled-components'
import { InputLabel, Input, Textarea } from '../textField'
import { BackstageTitle } from '../heading'
import { SmallButton } from '../buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

export const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

export const AddFaqWrapper = styled.div`
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

export const Title = styled(BackstageTitle)`
  ${MEDIA_QUERY_SM} {
    margin-top: 3rem;
  }
`

export const AddFaq = styled.form`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 30px;
`

export const QuestionInput = styled(Input)`
  width: 100%;
`

export const AnswerInput = styled(Textarea)`
  width: 100%;
  height: 7.5rem;
`

export const ConfirmButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

export const CancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

export const AddButton = styled(SmallButton)`
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

export default function ManageFaqPageAdd({
  handleToggleAddPopUp,
  handleInput,
  handleAddFaq,
}) {
  return (
    <>
      <BackDrop onClick={handleToggleAddPopUp} />
      <AddFaqWrapper>
        <Title>新增常見問題</Title>
        <AddFaq>
          <InputLabel>問題</InputLabel>
          <QuestionInput
            name="question"
            placeholder="請輸入問題"
            onChange={handleInput}
          />
          <InputLabel>回答</InputLabel>
          <AnswerInput
            name="answer"
            placeholder="請輸入回答"
            onChange={handleInput}
          />
        </AddFaq>
        <ConfirmButtonsWrapper>
          <CancelButton onClick={handleToggleAddPopUp}>取消</CancelButton>
          <AddButton type="submit" onClick={handleAddFaq}>
            新增
          </AddButton>
        </ConfirmButtonsWrapper>
      </AddFaqWrapper>
    </>
  )
}
