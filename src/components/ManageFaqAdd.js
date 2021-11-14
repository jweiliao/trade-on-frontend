import styled from 'styled-components'
// import Container from '../../components/Container'
import { Input, Textarea } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'

const AddFaqWrapper = styled.div`
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
`
const Title = styled(BackstageTitle)``

const AddFaq = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  // padding-left: 30px;
  font-size: 20px;
  margin-bottom: 30px;
`
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

const FaqAnswer = styled(Textarea)`
  width: 100%;
  height: 7.5rem;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.general_500};
    background-color: ${(props) => props.theme.general_000};
    box-shadow: none;
  }
`

const FaqConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`
const FaqCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`
const FaqSaveButton = styled(SmallButton)`
  margin-left: 27px;
`

export default function ManageFaqPageAdd({ setAddPopUp }) {
  const handleAdd = () => {
    setAddPopUp(false)
    Swal.fire({
      icon: 'success',
      title: '新增成功',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const handleCancelClick = () => {
    setAddPopUp(false)
  }

  return (
    <AddFaqWrapper>
      {/* 標題 */}
      <Title>新增常見問題</Title>
      <AddFaq>
        問題<FaqQuestion name="question" placeholder="請輸入問題"></FaqQuestion>
        回答<FaqAnswer name="answer" placeholder="請輸入回答"></FaqAnswer>
      </AddFaq>
      <FaqConfirmWrapper>
        <FaqCancelButton onClick={handleCancelClick}>取消</FaqCancelButton>
        <FaqSaveButton type="submit" onClick={handleAdd}>
          新增
        </FaqSaveButton>
      </FaqConfirmWrapper>
    </AddFaqWrapper>
  )
}
