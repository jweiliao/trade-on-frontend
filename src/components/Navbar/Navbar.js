import React, { useContext } from 'react'
import AuthContext from '../../contexts'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { SmallButton } from '../buttons'
import NavbarSubmenu from './NavbarSubmenu'
import ClickAwayListener from 'react-click-away-listener'
import * as GiIcons from 'react-icons/gi'
import useNavbar from '../../hooks/useNavbar'

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  top: 0;
  left: 0;
  padding: 0 1.6rem;
  background: ${(props) => props.theme.general_000};
  border-bottom: solid 0.1rem ${(props) => props.theme.general_200};
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
    rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  z-index: 10;
`

const HeaderLeft = styled(Link)`
  color: ${(props) => props.theme.primary_300};
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const NavItem = styled(Link)`
  color: ${(props) => props.theme.secondary};
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  letter-spacing: 0.05rem;
  margin-right: 3rem;
  ${MEDIA_QUERY_SM} {
    display: none;
  }
`

const LoginLink = styled(SmallButton)`
  ${MEDIA_QUERY_SM} {
    display: none;
  }
`

const Avatar = styled.div`
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: solid 0.1rem ${(props) => props.theme.general_200};
  ${MEDIA_QUERY_SM} {
    display: none;
  }
`

const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const HamburgerIcon = styled(GiIcons.GiHamburgerMenu)`
  display: none;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.2);
  }

  ${MEDIA_QUERY_SM} {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    color: ${(props) => props.theme.primary_200};
    border: none;
    cursor: pointer;
  }
`

const DropdownNav = styled.div`
  background-color: ${(props) => props.theme.general_200};
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 11rem;
  position: fixed;
  ${({ dropdown }) => (dropdown ? 'top:64px' : 'display:none')};
  right: 22px;
  transition: 500ms;
  z-index: 10;
`

export default function Navbar() {
  const { user } = useContext(AuthContext)
  const { dropdown, toggleDropdown, hideDropdown, submenuData, handleLogout } =
    useNavbar()

  return (
    <HeaderContainer>
      <HeaderLeft to="/">Trade On</HeaderLeft>
      <HeaderRight>
        <NavItem to="/givings">禮物</NavItem>
        <NavItem to="/about">關於我們</NavItem>

        {user ? (
          <Avatar onClick={toggleDropdown}>
            <Img src={user.avatarUrl} />
          </Avatar>
        ) : (
          <LoginLink as={Link} to="/login">
            登入
          </LoginLink>
        )}

        <HamburgerIcon onClick={toggleDropdown} />
        <ClickAwayListener onClickAway={hideDropdown}>
          <DropdownNav dropdown={dropdown} onClick={toggleDropdown}>
            {submenuData.map(
              (item, index) =>
                item.isShow && (
                  <NavbarSubmenu
                    item={item}
                    key={index}
                    onClick={item.title === '登出' ? handleLogout : null}
                  />
                )
            )}
          </DropdownNav>
        </ClickAwayListener>
      </HeaderRight>
    </HeaderContainer>
  )
}
