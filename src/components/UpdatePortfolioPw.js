import React, { useContext } from 'react'
import styled from 'styled-components'
import Container from './Container'
import { PageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import { useHistory } from 'react-router'
import AuthContext from '../contexts'
import { updateUserPassword } from '../WebAPI'

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
const UpdatePwWrapper = styled(Form)`
  z-index: 100;
  width: 500px;
  padding: 2.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid ${(props) => props.theme.general_500};
  border-radius: 0.25rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-out;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    max-width: 80%;
  }
`

/* 標題 */
const Title = styled(PageTitle)``

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
const InputContent = styled.div`
  width: 100%;
`

/* 所有按鈕操作的整個區塊 */
const PwConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

/* "取消" 按鈕 */
const PwCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

/* "更新密碼" 按鈕 */
const PwUpdateButton = styled(SmallButton)`
  margin-left: 27px;
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
`

// 將從父層傳入的 setPwPopUp、closeModal 這些 props 帶入
export default function UpdatePortfolioPw({ setPwPopUp, closeModal }) {
  const {
    user: { id },
  } = useContext(AuthContext)
  const history = useHistory()

  // 當點擊 "取消" 的按鈕時，執行 handleCancelClick
  const handleCancelClick = () => {
    // 更新 pwPopUp 的 state 為 false （不顯示設定新密碼的彈窗）
    setPwPopUp(false)
  }

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('此欄位為必填'),
    newPassword: Yup.string().required('此欄位為必填'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      '請再次確認密碼'
    ),
  })

  const handleSubmit = (req) => {
    updateUserPassword(id, req)
      .then((res) => {
        const { data } = res
        console.log('data', data)
        if (data.message === 'success; password changed.') {
          history.push('/portfolio')
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          Swal.fire('目前密碼錯誤')
        }
      })
  }

  return (
    <>
      {/* 如果 setPwPopUp  的 state 為 true，顯示 BackDrop 遮罩*/}
      {/* 將 closeModal 帶入 BackDrop，設定當出現彈窗時，點擊彈窗外的區塊，會收回彈窗 */}
      {setPwPopUp && <BackDrop onClick={closeModal}></BackDrop>}
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <UpdatePwWrapper>
              {/* 標題 */}
              <Title>更改密碼</Title>

              {/* 與輸入框有關的整個區塊 */}
              <ModifyPw>
                <InputContent>
                  <FormikControl
                    control="input"
                    type="password"
                    label="目前密碼"
                    placeholder="輸入目前密碼"
                    name="oldPassword"
                  />
                </InputContent>
                <InputContent>
                  <FormikControl
                    control="input"
                    type="password"
                    label="新密碼"
                    placeholder="輸入新密碼"
                    name="newPassword"
                  />
                </InputContent>
                <InputContent>
                  <FormikControl
                    control="input"
                    type="password"
                    label="確認密碼"
                    placeholder="再次輸入新密碼"
                    name="confirmNewPassword"
                  />
                </InputContent>
              </ModifyPw>

              {/* 所有按鈕操作的整個區塊 */}
              <PwConfirmWrapper>
                {/* 點擊 "取消" 的按鈕時，執行 handleCancelClick */}
                <PwCancelButton onClick={handleCancelClick}>
                  取消
                </PwCancelButton>
                {/* 點擊 "更新密碼" 的按鈕時，執行 handleUpdate */}
                <PwUpdateButton type="submit">送出</PwUpdateButton>
              </PwConfirmWrapper>
            </UpdatePwWrapper>
          )}
        </Formik>
      </Container>
    </>
  )
}
