import React from 'react'
import { Field, ErrorMessage } from 'formik'
import {
  InputLabel,
  Input as StyledInput,
  Select as StyledSelect,
  Textarea as StyledTextarea,
  CheckBox as StyledCheckbox,
  CheckBoxLabel,
  CheckBoxSpan,
} from './textField'
import styled from 'styled-components'

const Text = styled.p`
  color: ${(props) => props.theme.danger_100};
  margin-top: 0.5rem;
  font-size: 0.9rem;
`

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
              <StyledInput id={name} {...field} {...rest} />
            </>
          )
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <Text>{msg}</Text>}</ErrorMessage>
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
              <StyledSelect id={name} name={name} {...field} {...rest}>
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
      <ErrorMessage name={name}>{(msg) => <Text>{msg}</Text>}</ErrorMessage>
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
              <StyledTextarea id={name} {...field} {...rest} />
            </>
          )
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <Text>{msg}</Text>}</ErrorMessage>
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
      <ErrorMessage name={name}>{(msg) => <Text>{msg}</Text>}</ErrorMessage>
    </div>
  )
}
