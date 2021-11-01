import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SmallTab = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  margin-right: 1rem;
  color: ${({ $isActive }) => {
    return $isActive
      ? (props) => props.theme.primary_200
      : (props) => props.theme.secondary
  }};
  border-bottom: ${({ $isActive }) => {
      return $isActive ? '0.1rem' : '0'
    }}
    solid ${(props) => props.theme.primary_200};
`

export const TabSmall = ({ isActive, label, path }) => (
  <SmallTab $isActive={isActive} to={path}>
    {label}
  </SmallTab>
)
