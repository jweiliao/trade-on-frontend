import React from 'react'
import { Input, Select, Textarea, CheckboxGroup } from './FormikFiled'

export default function FormikControl(props) {
  // control 來自 FormikControl 元件
  const { control, ...rest } = props
  // 根據 control 參數帶入不同的表單元件
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'date':
    default:
      return null
  }
}
