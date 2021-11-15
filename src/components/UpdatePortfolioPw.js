import styled from 'styled-components'
import { Input } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'

/* 彈窗的整個區塊 */
const UpdatePwWrapper = styled.div`
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

/* 標題 */
const Title = styled(BackstageTitle)``

/* 與輸入框有關的整個區塊 */
const ModifyPw = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  // padding-left: 30px;
  font-size: 20px;
  margin-bottom: 30px;
`

/* 每一個輸入框 */
const InputContent = styled(Input)`
  width: 100%;
  margin-bottom: 30px;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.general_500};
    background-color: ${(props) => props.theme.general_000};
    box-shadow: none;
  }
`

/* 所有按鈕操作的整個區塊 */
const PwConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`

/* "取消" 的按鈕 */
const PwCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`

/* "更新密碼" 的按鈕 */
const PwUpdateButton = styled(SmallButton)`
  margin-left: 27px;
`

// 將從父層傳入的 setPwPopUp 這個 props 帶入
export default function UpdatePortfolioPw({ setPwPopUp }) {
  // 當點擊 "更新" 的按鈕時，執行 handleUpdate
  const handleUpdate = () => {
    // 1. 更新 pwPopUp 的 state 為 false （不顯示設定新密碼的彈窗）
    setPwPopUp(false)

    // 2. 跳出 "更新成功"的彈窗提示
    Swal.fire({
      icon: 'success',
      title: '更新成功',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // 當點擊 "取消" 的按鈕時，執行 handleCancelClick
  const handleCancelClick = () => {
    // 更新 pwPopUp 的 state 為 false （不顯示設定新密碼的彈窗）
    setPwPopUp(false)
  }

  return (
    <UpdatePwWrapper>
      {/* 標題 */}
      <Title>修改密碼</Title>

      <ModifyPw>
        <InputContent
          name="password"
          type="password"
          placeholder="原密碼"
        ></InputContent>
        <InputContent
          name="password"
          type="password"
          placeholder="新密碼"
        ></InputContent>
        <InputContent
          name="confirmPassword"
          type="password"
          placeholder="再次輸入新密碼"
        ></InputContent>
      </ModifyPw>

      <PwConfirmWrapper>
        {/* 點擊 "取消" 的按鈕時，執行 handleCancelClick */}
        <PwCancelButton onClick={handleCancelClick}>取消</PwCancelButton>

        {/* 點擊 "更新密碼" 的按鈕時，執行 handleUpdate */}
        <PwUpdateButton type="submit" onClick={handleUpdate}>
          更新密碼
        </PwUpdateButton>
      </PwConfirmWrapper>
    </UpdatePwWrapper>
  )
}
