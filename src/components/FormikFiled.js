import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import {
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledTextarea,
  StyledRadio,
  StyledCheckbox,
} from './textField'

/* label: 欄位標籤 name: 欄位名稱 rest: */
export const Input = (props) => {
  const { label, name, touched, errors, ...rest } = props
  return (
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {/* <Field id={name} name={name} {...rest} /> */}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <>
              <StyledInput
                type="text"
                id={name}
                {...field}
                {...rest}
                inputColor={
                  meta.touched && meta.error ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)'
                }
              />
            </>
          )
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}
export const Select = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {/* <Field id={name} name={name} {...rest}> */}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <>
              <StyledSelect
                type="select"
                id={name}
                name={name}
                {...field}
                {...rest}
              >
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
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export const Textarea = (props) => {
  const { label, name, ...rest } = props
  return (
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {/* <Field as="textarea" id={name} name={name} {...rest} /> */}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <>
              <StyledTextarea
                type="textarea"
                id={name}
                {...field}
                {...rest}
                inputColor={
                  meta.touched && meta.error ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)'
                }
              />
            </>
          )
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <StyledRadio
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export const CheckboxGroup = (props) => {
  const { label, name, options, errors, ...rest } = props
  console.log(props)
  return (
    <div>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <StyledCheckbox
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}
