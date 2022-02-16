import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SubmenuLink = styled(Link)`
  width: 100%;
  height: 3.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem;
  color: ${(props) => props.theme.primary_200};
  background: ${(props) => props.theme.general_200};
  text-decoration: none;
  list-style: none;

  &:hover {
    background: ${(props) => props.theme.general_100};
    border-left: 4px solid ${(props) => props.theme.primary_200};
    cursor: pointer;
  }
`

const SubmenuIcon = styled.span``

const SubmenuLabel = styled.span`
  color: ${(props) => props.theme.secondary};
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  letter-spacing: 0.05rem;
  margin-left: 1rem;
`

export default function NavbarSubmenu({ item, onClick }) {
  return (
    <SubmenuLink to={item.path} onClick={onClick}>
      <SubmenuIcon>{item.icon}</SubmenuIcon>
      <SubmenuLabel>{item.title}</SubmenuLabel>
    </SubmenuLink>
  )
}
