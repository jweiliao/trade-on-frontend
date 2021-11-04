import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TextTab = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  :not(:last-child) {
    margin-right: 1rem;
  }
  color: ${({ $isActive }) => {
    return $isActive
      ? (props) => props.theme.primary_100
      : (props) => props.theme.secondary
  }};
  border-bottom: ${({ $isActive }) => {
      return $isActive ? '0.1rem' : '0'
    }}
    solid ${(props) => props.theme.primary_100};
  cursor: ${({ $isActive }) => {
    return $isActive ? 'default' : 'pointer'
  }};
`
