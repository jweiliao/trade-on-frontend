import React from 'react'
import styled from 'styled-components'
import { TextTab } from '../../components/tabs'
import { InputErrorMessage } from '../../components/textField'
import { SuperLargeButton } from '../../components/buttons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/FormikControl'

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

const ErrorMessage = styled(InputErrorMessage)`
  display: none;
`

const LoginBtn = styled(SuperLargeButton)`
  margin-top: 1.25rem;
`

export default function LoginPage() {
  const initialValues = { email: '', password: '' }

  const validationSchema = Yup.object({
    email: Yup.string().required('此欄位為必填'),
    password: Yup.string().required('此欄位為必填'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('You clicked submit.')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Wrapper>
          <TabWrapper>
            <TextTab to="/login" $isActive="true">
              登入
            </TextTab>
            <TextTab to="/register">註冊</TextTab>
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
          <ErrorMessage>帳號或密碼錯誤，請重新輸入</ErrorMessage>
          <LoginBtn type="submit">登入</LoginBtn>
        </Wrapper>
      )}
    </Formik>
  )
}
