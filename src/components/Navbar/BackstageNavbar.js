import React from 'react'
import styled from 'styled-components'
import { BackstageNavbarData } from './BackstageNavbarData'
import { BackstageNavbarItem } from './BackstageNavbarItem'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { GiHamburgerMenu } from 'react-icons/gi'
import ClickAwayListener from 'react-click-away-listener'
import useNavbar from '../../hooks/useNavbar'

const Nav = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  font-size: 1.125rem;
  letter-spacing: 0.15px;
  z-index: 10;
`

const Icon = styled.div`
  display: none;
  ${MEDIA_QUERY_SM} {
    display: flex;
    justify-content: flex-end;
    background: ${(props) => props.theme.secondary};
  }
`

const HamburgerIcon = styled(GiHamburgerMenu)`
  font-size: 2.5rem;
  margin: 0.75rem 1.375rem;
  color: ${(props) => props.theme.general_000};
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.2);
  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.theme.secondary};
  ${MEDIA_QUERY_SM} {
    display: block;
    width:11.25rem;
    position: fixed;
    right: 1.375rem;
    display:${({ dropdown }) => (dropdown ? 'block' : 'none')}};
  }
`

const NavbarWrap = styled.div``

export default function BackstageNavbar() {
  const { dropdown, toggleDropdown, hideDropdown, handleLogout } = useNavbar()

  return (
    <Nav>
      <Icon>
        <HamburgerIcon onClick={toggleDropdown} />
      </Icon>
      <ClickAwayListener onClickAway={hideDropdown}>
        <Menu dropdown={dropdown} onClick={toggleDropdown}>
          <NavbarWrap>
            {BackstageNavbarData.BackstagePage.map((item, index) => {
              return <BackstageNavbarItem item={item} key={index} />
            })}
          </NavbarWrap>
          <NavbarWrap>
            {BackstageNavbarData.FrontPage.map((item, index) => {
              return (
                <BackstageNavbarItem
                  item={item}
                  key={index}
                  onClick={item.title === '登出' ? handleLogout : null}
                />
              )
            })}
          </NavbarWrap>
        </Menu>
      </ClickAwayListener>
    </Nav>
  )
}
