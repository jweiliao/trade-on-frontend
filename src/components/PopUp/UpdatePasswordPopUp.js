import React from 'react'
import styled from 'styled-components'
import Backdrop from './Backdrop'
import PopUp from './PopUp'
import { PageTitle } from '../heading'
import { SmallButton, GraySmallButton } from '../buttons'
import { Formik, Form } from 'formik'
import FormikControl from '../FormikControl'
import usePassword from '../../hooks/usePassword'

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const CancelButton = styled(GraySmallButton)``

const SubmitButton = styled(SmallButton)`
  margin-left: 1rem;
`

export default function UpdatePasswordPopUp(props) {
  const { initialValues, validationSchema, handleSubmit } = usePassword()

  return (
    <>
      <Backdrop onClick={props.handleTogglePasswordPopUp} />
      <PopUp>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <PageTitle>更改密碼</PageTitle>
              <FormikControl
                control="input"
                type="password"
                label="目前密碼"
                placeholder="輸入目前密碼"
                name="oldPassword"
              />
              <FormikControl
                control="input"
                type="password"
                label="新密碼"
                placeholder="輸入新密碼"
                name="newPassword"
              />
              <FormikControl
                control="input"
                type="password"
                label="確認密碼"
                placeholder="再次輸入新密碼"
                name="confirmNewPassword"
              />
              <ConfirmButtons>
                <CancelButton
                  type="button"
                  onClick={props.handleTogglePasswordPopUp}
                >
                  取消
                </CancelButton>
                <SubmitButton type="submit">送出</SubmitButton>
              </ConfirmButtons>
            </Form>
          )}
        </Formik>
      </PopUp>
    </>
  )
}
