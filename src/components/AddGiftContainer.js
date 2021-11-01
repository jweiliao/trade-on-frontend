import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import { CenterLargeButton } from './buttons'

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
    { key: '全家店到店', value: '全家店到店' },
    { key: '11店到店', value: '7-11店到店' },
    { key: '面交', value: '面交' },
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
    checkboxOption: Yup.array().min(1, '必填'),
  })
  // 送出資料
  const onSubmit = (values) => {
    console.log('Form data', values)
    console.log('Save data', JSON.parse(JSON.stringify(values)))
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="sub-title">禮物資訊</div>
          <FormikControl control="input" label="物品名稱" name="itemName" />
          <FormikControl
            control="select"
            label="物品分類"
            name="selectOption"
            options={dropDownOptions}
          />
          <FormikControl
            control="select"
            label="新舊程度"
            name="selectGoods"
            options={dropDownOptions}
          />
          <FormikControl
            control="select"
            label="物品數量"
            name="selectCount"
            options={dropDownOptions}
          />
          <FormikControl
            control="textarea"
            label="物品內容說明"
            name="description"
          />
          <label class="sc-kfPuZi jxJhVC">圖片上傳</label>
          <input type="file" />
          <hr />
          <div className="sub-title">交貨方式</div>
          <FormikControl
            control="checkbox"
            label=""
            name="checkboxOption"
            options={checkboxOptions}
          />
          <FormikControl
            control="select"
            label="選擇縣市"
            name="selectOption"
            options={dropDownOptions}
          />
          <CenterLargeButton type="submit">新增物品</CenterLargeButton>
        </Form>
      )}
    </Formik>
  )
}
