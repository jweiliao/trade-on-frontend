import React, { useContext } from 'react'
import AuthContext from '../../contexts'
import { login } from '../../WebAPI'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Container from '../../components/Container'
import { TextTab } from '../../components/tabs'
import { SuperLargeButton } from '../../components/buttons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/FormikControl'
import Swal from 'sweetalert2'

const Wrapper = styled(Form)`
  width: 500px;
  max-width: 94%;
  margin: 5rem auto;
  border: 0.1rem solid ${(props) => props.secondary};
  padding: 2.5rem;
  border-radius: 0.25rem;
`

const TabWrapper = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: center;
`

const Divider = styled.hr`
  margin-bottom: 1.25rem;
`

const InputWrapper = styled.div``

const LoginBtn = styled(SuperLargeButton)`
  margin-top: 1.25rem;
`

export default function LoginPage() {
  const history = useHistory()
  const { setUser } = useContext(AuthContext)

  const initialValues = { email: '', password: '' }

  const validationSchema = Yup.object({
    email: Yup.string().required('此欄位為必填'),
    password: Yup.string().required('此欄位為必填'),
  })

  const handleLogin = async (values) => {
    try {
      const { data } = await login(values.email, values.password)
      if (data.message === 'success') {
        setUser(data.user)
        history.push('/givings')
      }
    } catch (err) {
      if (err.response.data === 'Unauthorized') {
        Swal.fire({
          icon: 'error',
          text: '帳號或密碼輸入錯誤',
          showConfirmButton: false,
          timer: 1500,
        })
        return
      }
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '系統問題，請稍候',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {(formik) => (
          <Wrapper>
            <TabWrapper>
              <TextTab $isActive={true}>登入</TextTab>
              <TextTab as={Link} to="/register">
                註冊
              </TextTab>
            </TabWrapper>
            <Divider />
            <InputWrapper>
              <FormikControl
                control="input"
                label="信箱"
                name="email"
                placeholder="輸入信箱"
              />
              <FormikControl
                control="input"
                type="password"
                label="密碼"
                name="password"
                placeholder="輸入密碼"
              />
            </InputWrapper>
            <LoginBtn type="submit">登入</LoginBtn>
          </Wrapper>
        )}
      </Formik>
    </Container>
  )
}
