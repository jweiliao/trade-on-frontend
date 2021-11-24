import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TextTab = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 24px;
  letter-spacing: 0.5px;
  :not(:last-child) {
    margin-right: 1.5rem;
  }
  color: ${({ $isActive }) => {
    return $isActive
      ? (props) => props.theme.primary_150
      : (props) => props.theme.secondary
  }};
  border-bottom: ${({ $isActive }) => {
      return $isActive ? '0.1rem' : '0'
    }}
    solid ${(props) => props.theme.primary_150};
  cursor: ${({ $isActive }) => {
    return $isActive ? 'default' : 'pointer'
  }};
`
export const BorderTab = styled.div`
  display: inline-block;
  width: 100%;
  background: ${({ $isActive }) => {
    return $isActive
      ? (props) => props.theme.primary_000
      : (props) => props.theme.primary_200
  }};
  border: 1px solid ${(props) => props.theme.general_300};
  border-bottom: ${({ $isActive }) => {
    return $isActive ? '0px' : `1px solid ${(props) => props.theme.general_000}`
  }};
  border-radius: 0.625rem 0.625rem 0 0;
  font-size: 1.125rem;
  text-align: center;
  padding: 0.7rem;
  cursor: ${({ $isActive }) => {
    return $isActive ? 'default' : 'pointer'
  }};
  &:hover {
    background: ${({ $isActive }) => {
      return $isActive
        ? (props) => props.theme.primary_000
        : (props) => props.theme.primary_250
    }};
  }
`
