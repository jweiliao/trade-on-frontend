import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

/* Style - 下拉選單中的每一欄 */
const SubmenuLink = styled(Link)`
  width: 150px;
  height: 52px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 7px 16px;
  color: ${(props) => props.theme.primary_200};
  background: ${(props) => props.theme.general_200};
  font-size: 16px;
  text-decoration: none;
  list-style: none;

  &:hover {
    background: ${(props) => props.theme.general_100};
    border-left: 4px solid ${(props) => props.theme.primary_200};
    cursor: pointer;
  }
`
/* Style - 下拉選單中每一欄的 icon */
const SubmenuIcon = styled.span``

/* Style - 下拉選單中每一欄的文字 */
const SubmenuLabel = styled.span`
  margin-left: 16px;
  font-weight: normal;
  line-height: 24px;
  /* or 150% */
  color: ${(props) => props.theme.secondary};
  letter-spacing: 0.5px;
`

export default function FrontnavbarSubmenu({ item }) {
  return (
    <>
      <SubmenuLink to={item.path}>
        <SubmenuIcon>{item.icon}</SubmenuIcon>
        <SubmenuLabel>{item.title}</SubmenuLabel>
      </SubmenuLink>
    </>
  )
}
