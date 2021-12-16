import React from 'react'
import styled from 'styled-components'
import { BackstageNavbarData } from './BackstageNavbarData'
import { BackstageNavbarItem } from './BackstageNavbarItem'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import useNavbar from '../../hooks/useNavbar'

const Nav = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  background: ${(props) => props.theme.secondary};
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-item: center;
  font-size: 18px;
  letter-spacing: 0.15px;
  ${MEDIA_QUERY_SM} {
    display: block;
  }
`

const NavbarWrap = styled.div``

export default function BackstageNavbar() {
  const { handleLogout } = useNavbar()

  return (
    <Nav>
      <NavbarWrap>
        {BackstageNavbarData.BackstagePage.map((item, index) => {
          return <BackstageNavbarItem item={item} key={index} />
        })}
      </NavbarWrap>
      <NavbarWrap>
        {BackstageNavbarData.FontPage.map((item, index) => {
          return (
            <BackstageNavbarItem
              item={item}
              key={index}
              onClick={item.title === '登出' ? handleLogout : null}
            />
          )
        })}
      </NavbarWrap>
    </Nav>
  )
}
