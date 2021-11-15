import styled from 'styled-components'
import Container from '../../components/Container'
import { Input, Textarea } from '../../components/textField'
import { BackstageTitle } from '../../components/heading'
import { SmallButton } from '../../components/buttons'

/* 標題 */
const Title = styled(BackstageTitle)``

/* 編輯問答的整個區塊 */
const EditFaqWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 30px;
  font-size: 20px;
`

/* 輸入框 - 問題 */
const FaqQuestion = styled(Input)`
  width: 100%;
  margin-bottom: 50px;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.general_500};
    background-color: ${(props) => props.theme.general_000};
    box-shadow: none;
  }
`
/* 輸入框 - 回答 */
const FaqAnswer = styled(Textarea)`
  width: 100%;
  height: 7.5rem;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.general_500};
    background-color: ${(props) => props.theme.general_000};
    box-shadow: none;
`

/* 確認更新的按鈕們 */
const FaqConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
`
/* "取消" 按鈕 */
const FaqCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`

/* "儲存" 按鈕 */
const FaqSaveButton = styled(SmallButton)`
  margin-left: 27px;
`
export default function ManageFaqPageEdit() {
  return (
    <Container>
      {/* 標題 */}
      <Title>編輯常見問題</Title>

      {/* 編輯問答的整個區塊 */}
      <EditFaqWrapper>
        問題<FaqQuestion name="question"></FaqQuestion>
        回答<FaqAnswer name="answer"></FaqAnswer>
      </EditFaqWrapper>

      {/* 確認更新的按鈕們  */}
      <FaqConfirmWrapper>
        <FaqCancelButton>取消</FaqCancelButton>
        <FaqSaveButton type="submit">儲存</FaqSaveButton>
      </FaqConfirmWrapper>
    </Container>
  )
}
