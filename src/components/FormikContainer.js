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
  // radio 資料
  const radioOptions = [
    { key: 'option 1', value: 'rOption1' },
    { key: 'option 2', value: 'rOption2' },
    { key: 'option 3', value: 'rOption3' },
  ]
  // checkbox 資料
  const checkboxOptions = [
    { key: 'option 1', value: 'cOption1' },
    { key: 'option 2', value: 'cOption2' },
    { key: 'option 3', value: 'cOption3' },
  ]
  // 初始化狀態
  const initialValues = {
    itemName: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
  }

  // 驗證規則
  const validationSchema = Yup.object({
    itemName: Yup.string().required('必填'),
    description: Yup.string().required('必填'),
    selectOption: Yup.string().required('必填'),
    radioOption: Yup.string().required('必填'),
    checkboxOption: Yup.array().required('必填'),
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
          <FormikControl
            control="radio"
            type="radio"
            label="Radio Topic"
            name="radioOption"
            options={radioOptions}
          />
          <FormikControl
            control="checkbox"
            type="checkbox"
            label="checkbox Topic"
            name="checkboxOption"
            options={checkboxOptions}
          />
          <button type="submit">新增物品</button>
          <CenterLargeButton>新增物品</CenterLargeButton>
        </Form>
      )}
    </Formik>
  )
}
