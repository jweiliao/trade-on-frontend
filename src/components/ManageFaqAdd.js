import styled from 'styled-components'
import Container from './Container'
import { Input, Textarea } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'

/* 彈窗出現時的遮罩背景 */
const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

/* 彈窗的整個區塊 */
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
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-out;

  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    max-width: 80%;
  }
`

/* 標題 */
const Title = styled(BackstageTitle)`
  ${MEDIA_QUERY_SM} {
    margin-top: 3rem;
  }
`
/* 新增問答輸入框的整個區塊 */
const AddFaq = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 30px;
`

/* 問題 */
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

/* 回答 */
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
/* 所有按鈕操作的整個區塊 */
const FaqConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

/* "取消" 按鈕 */
const FaqCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

/* "新增" 按鈕 */
const FaqAddButton = styled(SmallButton)`
  margin-left: 27px;
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
`

// 將從父層傳入的 setAddPopUp、closeModal 這些 props 帶入
export default function ManageFaqPageAdd({ setAddPopUp, closeModal }) {
  // 當點擊 "新增" 按鈕時，執行 handleAdd
  const handleAdd = () => {
    // 1. 更新 addPopUp 的 state 為 false （不顯示設定新密碼的彈窗）
    setAddPopUp(false)

    // 2. 跳出 "新增成功"的彈窗提示
    Swal.fire({
      icon: 'success',
      title: '新增成功',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // 當點擊 "取消" 的按鈕時，執行 handleCancelClick
  const handleCancelClick = () => {
    // 更新 addPopUp 的 state 為 false （不顯示設定新密碼的彈窗）
    setAddPopUp(false)
  }

  return (
    <>
      {/* 如果 setAddPopUp  的 state 為 true，顯示 BackDrop 遮罩*/}
      {/* 將 closeModal 帶入 BackDrop，設定當出現彈窗時，點擊彈窗外的區塊，會收回彈窗 */}
      {setAddPopUp && <BackDrop onClick={closeModal}></BackDrop>}
      <Container>
        <AddFaqWrapper>
          {/* 標題 */}
          <Title>新增常見問題</Title>

          {/* 新增問答輸入框的整個區塊 */}
          <AddFaq>
            問題
            <FaqQuestion name="question" placeholder="請輸入問題"></FaqQuestion>
            回答<FaqAnswer name="answer" placeholder="請輸入回答"></FaqAnswer>
          </AddFaq>

          {/*所有按鈕操作的整個區塊 */}
          <FaqConfirmWrapper>
            <FaqCancelButton onClick={handleCancelClick}>取消</FaqCancelButton>
            <FaqAddButton type="submit" onClick={handleAdd}>
              新增
            </FaqAddButton>
          </FaqConfirmWrapper>
        </AddFaqWrapper>
      </Container>
    </>
  )
}
