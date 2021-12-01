import React from 'react'
import { Field, ErrorMessage } from 'formik'
import {
  InputLabel,
  InputErrorMessage,
  Input as StyledInput,
  Select as StyledSelect,
  Textarea as StyledTextarea,
  CheckBox as StyledCheckbox,
  CheckBoxLabel,
  CheckBoxSpan,
} from './textField'

/* label: 欄位標籤 name: 欄位名稱 rest: */
export const Input = (props) => {
  const { label, name, touched, errors, placeholder, ...rest } = props
  return (
    <>
      {label ? <InputLabel htmlFor={name}>{label}</InputLabel> : null}
      {/* <Field id={name} name={name} {...rest} /> */}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <>
              <StyledInput
                id={name}
                placeholder={placeholder}
                {...field}
                {...rest}
                borderColor={meta.touched && meta.error ? '#e25151' : '#D3D4D6'}
              />
            </>
          )
        }}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <InputErrorMessage>{msg}</InputErrorMessage>}
      </ErrorMessage>
    </>
  )
}
export const Select = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <>
      {label ? <InputLabel htmlFor={name}>{label}</InputLabel> : null}
      {/* <Field id={name} name={name} {...rest}> */}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <>
              <StyledSelect
                id={name}
                name={name}
                {...field}
                {...rest}
                borderColor={meta.touched && meta.error ? '#e25151' : '#D3D4D6'}
              >
                <option value="" disabled>
                  選擇{label}
                </option>
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  )
                })}
              </StyledSelect>
            </>
          )
        }}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <InputErrorMessage>{msg}</InputErrorMessage>}
      </ErrorMessage>
    </>
  )
}

export const Textarea = (props) => {
  const { label, name, ...rest } = props
  return (
    <div>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      {/* <Field as="textarea" id={name} name={name} {...rest} /> */}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <>
              <StyledTextarea
                id={name}
                {...field}
                {...rest}
                borderColor={meta.touched && meta.error ? '#e25151' : '#D3D4D6'}
              />
            </>
          )
        }}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <InputErrorMessage>{msg}</InputErrorMessage>}
      </ErrorMessage>
    </div>
  )
}

export const CheckboxGroup = (props) => {
  const { label, name, options, errors, ...rest } = props
  return (
    <div>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <CheckBoxLabel key={option.key}>
                {option.key}
                <StyledCheckbox
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <CheckBoxSpan />
              </CheckBoxLabel>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <InputErrorMessage>{msg}</InputErrorMessage>}
      </ErrorMessage>
    </div>
  )
}
