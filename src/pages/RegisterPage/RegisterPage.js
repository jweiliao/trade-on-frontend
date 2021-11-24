import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
  padding: 2.5rem 2.5rem 1.75rem;
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

const RegisterBtn = styled(SuperLargeButton)`
  margin-top: 1.25rem;
`

const WarnText = styled.p`
  text-align: center;
  margin-top: 1.25rem;
  color: ${(props) => props.theme.general_300};
`

const AgreeItemLink = styled(Link)`
  text-decoration: underline;
  color: ${(props) => props.theme.general_300};
`

export default function RegisterPage() {
  const initialValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('信箱格式不正確').required('此欄位為必填'),
    name: Yup.string().required('此欄位為必填'),
    password: Yup.string().min(6, '長度至少為 6 位').required('此欄位為必填'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], '請再次確認密碼')
      .required('此欄位為必填'),
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
            <TextTab to="/login">登入</TextTab>
            <TextTab to="/register" $isActive="true">
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
            <ErrorMessage>此信箱已經註冊</ErrorMessage>
            <FormikControl
              control="input"
              label="暱稱"
              name="name"
              placeholder="輸入暱稱"
            />
            <FormikControl
              control="input"
              type="password"
              label="密碼"
              placeholder="輸入密碼"
              name="password"
            />
            <FormikControl
              control="input"
              type="password"
              label="確認密碼"
              placeholder="再次輸入密碼"
              name="confirmPassword"
            />
          </InputWrapper>
          <RegisterBtn type="submit">註冊</RegisterBtn>
          <WarnText>
            註冊即代表您同意遵守 TRADE ON <span> </span>
            <AgreeItemLink to="/terms" target="_blank">
              服務條款
            </AgreeItemLink>
            <span> </span>與<span> </span>
            <AgreeItemLink to="/privacy" target="_blank">
              隱私權政策
            </AgreeItemLink>
          </WarnText>
        </Wrapper>
      )}
    </Formik>
  )
}
