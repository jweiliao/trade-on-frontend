import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
/* label: 欄位標籤 name: 欄位名稱 rest: */
export const Input = (props) => {
  const { label, name, ...rest } = props
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </>
  )
}
export const Select = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  )
}

export const Textarea = (props) => {
  const { label, name, ...rest } = props
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </>
  )
}

export const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <>
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            console.log(field.value, option.value)
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
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
    </>
  )
}

export const CheckboxGroup = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <>
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  )
}
