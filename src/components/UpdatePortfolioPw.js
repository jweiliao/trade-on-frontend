import styled from 'styled-components'
// import Container from '../../components/Container'
import { Input } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'

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
const Title = styled(BackstageTitle)``

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

const PwConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`
const PwCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`
const PwUpdateButton = styled(SmallButton)`
  margin-left: 27px;
`

export default function ManageFaqPageAdd({ setPwPopUp }) {
  const handleUpdate = () => {
    setPwPopUp(false)
    Swal.fire({
      icon: 'success',
      title: '更新成功',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const handleCancelClick = () => {
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
        <PwCancelButton onClick={handleCancelClick}>取消</PwCancelButton>
        <PwUpdateButton type="submit" onClick={handleUpdate}>
          更新密碼
        </PwUpdateButton>
      </PwConfirmWrapper>
    </UpdatePwWrapper>
  )
}
