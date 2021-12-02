import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { SmallButton } from '../buttons'
import FrontNavbarSubMenu from './FrontnavbarSubmenu'
import ClickAwayListener from 'react-click-away-listener'
import * as GiIcons from 'react-icons/gi'
import useSubmenu from './useSubmenu'

/* 導覽列 */
const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  top: 0;
  left: 0;
  right: 0;
  padding: 24px 120px 24px 22px;
  background: #ffffff;
  border-bottom: solid 1px ${(props) => props.theme.general_200};
  z-index: 10;

  ${MEDIA_QUERY_SM} {
    padding: 24px 22px 24px 22px;
  }
`
/* 導覽列左邊 - 品牌名稱的連接 */
const HeaderLeft = styled(Link)`
  min-width: 89px;
  height: 16px;
  color: ${(props) => props.theme.primary_300};
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
`
/* 導覽列右邊 */
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

/* 導覽列右邊 Item 的連接 */
const NavItem = styled(Link)`
  height: 27px;
  margin-right: 50px;
  display: flex;
  color: ${(props) => props.theme.secondary};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.15px;

  ${MEDIA_QUERY_SM} {
    display: none;
  }
`

/* 登入後，user 頭像的整個元件 */
const LoginAvatar = styled.div`
  position: relative;
  display: inline-block;
`
/* Style - user 頭像  */
const Avatar = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.primary_200};
  // background: url(.png);
  border-radius: 44px;
  border: none;
  cursor: pointer;

  ${MEDIA_QUERY_SM} {
    display: none;
  }
`

/* Style - hamburger 選單的 icon  */
const HamburgerIcon = styled(GiIcons.GiHamburgerMenu)`
  display: none;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.2);
  }

  ${MEDIA_QUERY_SM} {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: none;
    color: ${(props) => props.theme.primary_200};
    border: none;
    cursor: pointer;
  }
`

/* Style - 下拉選單 */
const DropdownNav = styled.div`
  background-color: ${(props) => props.theme.general_200};
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  ${({ dropdown }) => (dropdown ? 'top:64px' : 'display:none')};
  right: 22px;
  transition: 500ms;
  z-index: 10;

  ${MEDIA_QUERY_SM} {
    right: 22px;
  }
`

// 使用者是否登入
const user = true

export default function FrontNavbar() {
  // 利用 dropdown 的 state 來判斷下拉選單是否呈現
  const [dropdown, setDropdown] = useState(false)

  // 顯示或隱藏 dropdown
  const toggleDropdown = () => setDropdown(!dropdown)

  // 監聽 Listener: 點擊頁面其他地方時，如果有下拉選單時則隱藏下拉選單，否則不進行任何動作
  const hideDropdown = () => (dropdown ? toggleDropdown() : null)

  // 從 useSubmenu.js 拿到 submenu 的資料
  const { submenuData } = useSubmenu()
  // console.log(submenuData)

  return (
    <HeaderContainer>
      {/* 導覽列左側： 品牌 */}
      <HeaderLeft to="/">Trade On</HeaderLeft>

      {/* 導覽列右側：連接、註冊/登入 */}
      <HeaderRight>
        <NavItem to="/givings">禮物</NavItem>
        <NavItem to="/about">關於我們</NavItem>

        {/* 未登入前顯示： "註冊/登入" 按鈕 */}
        {!user && (
          <>
            <Link to="/login">
              <SmallButton
                style={{
                  cursor: 'pointer',
                }}
              >
                註冊/登入
              </SmallButton>
            </Link>
          </>
        )}

        {/* 登入後顯示：頭像、下拉選單 */}
        {user && (
          <>
            <LoginAvatar>
              {/* 頭像: media query 大於 768px 時才出現 */}
              <Avatar onClick={toggleDropdown}></Avatar>

              {/* hamburger 選單： media query 小於 768px 時才出現 */}
              <HamburgerIcon onClick={toggleDropdown}></HamburgerIcon>

              {/* 下拉選單 */}
              {/* 監測是否點擊的是頁面其他地方 */}
              <ClickAwayListener onClickAway={hideDropdown}>
                <DropdownNav dropdown={dropdown} onClick={toggleDropdown}>
                  {/* submenuData 從 FrontSubnavMemberData 撈資料後，設定 RWD 與 管理員條件，然後這邊用 map 帶入每欄 submenu 的內容 */}
                  {submenuData.map((item, index) => {
                    return <FrontNavbarSubMenu item={item} key={index} />
                  })}
                </DropdownNav>
              </ClickAwayListener>
            </LoginAvatar>
          </>
        )}
      </HeaderRight>
    </HeaderContainer>
  )
}
