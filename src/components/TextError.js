import React from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.danger};
`
// 錯誤訊息
export default function TextError(props) {
  return <ErrorMessage>{props.children}</ErrorMessage>
}
