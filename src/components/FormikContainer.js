import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import { CenterLargeButton } from './buttons'
import styled from 'styled-components'

export default function FormikContainer() {
  // select 資料
  const dropDownOptions = [
    { key: '請選擇', value: '' },
    { key: 'option 1', value: 'option 1' },
    { key: 'option 2', value: 'option 2' },
    { key: 'option 3', value: 'option 3' },
  ]
  // 初始化狀態
  const initialValues = {
    itemName: '',
    description: '',
    selectOption: '',
  }

  // 驗證規則
  const validationSchema = Yup.object({
    itemName: Yup.string().required('必填'),
    description: Yup.string().required('必填'),
    selectOption: Yup.string().required('必填'),
  })
  // 送出資料
  const onSubmit = (values) => {
    console.log('Form data', values)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="input"
            label="物品名稱"
            name="itemName"
            className="xx"
          />
          <FormikControl
            control="textarea"
            type="textarea"
            label="物品內容"
            name="description"
          />
          <FormikControl
            control="select"
            type="select"
            label="選單"
            name="selectOption"
            options={dropDownOptions}
          />
          <button type="submit">新增物品</button>
          <CenterLargeButton>新增物品</CenterLargeButton>
        </Form>
      )}
    </Formik>
  )
}
