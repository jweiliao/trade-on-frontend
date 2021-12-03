import { useState, useEffect, useContext } from 'react'
import AuthContext from '../contexts'
import Swal from 'sweetalert2'
import { logout } from '../WebAPI'
import { NavbarData } from '../components/Navbar/NavbarData'
import useRWD from './useRWD'

export default function useNavbar() {
  const [dropdown, setDropdown] = useState(false)
  const toggleDropdown = () => setDropdown(!dropdown)
  const hideDropdown = () => (dropdown ? setDropdown(!dropdown) : null)

  const { user, setUser } = useContext(AuthContext)
  const device = useRWD()
  const [submenuData, setSubMenuData] = useState([])

  useEffect(() => {
    // 沒登入
    if (!user && device === 'PC') {
      setSubMenuData(
        NavbarData.map((item) => {
          return {
            ...item,
            isShow: !item.isShow,
          }
        })
      )
      return
    }

    if (!user) {
      setSubMenuData(
        NavbarData.map((item) => {
          if (
            item.title !== '個人主頁' &&
            item.title !== '交易記錄' &&
            item.title !== '登出' &&
            item.title !== '後台管理'
          ) {
            return item
          }
          return {
            ...item,
            isShow: !item.isShow,
          }
        })
      )
      return
    }

    // 一般登入
    if (user.accountAuthority !== 'admin' && device === 'PC') {
      setSubMenuData(
        NavbarData.map((item) => {
          if (
            item.title !== '禮物' &&
            item.title !== '關於我們' &&
            item.title !== '登入' &&
            item.title !== '後台管理'
          )
            return item
          return {
            ...item,
            isShow: !item.isShow,
          }
        })
      )
      return
    }

    if (user.accountAuthority !== 'admin') {
      setSubMenuData(
        NavbarData.map((item) => {
          if (item.title !== '登入' && item.title !== '後台管理') return item
          return {
            ...item,
            isShow: !item.isShow,
          }
        })
      )
      return
    }

    // 管理員登入
    if (user.accountAuthority === 'admin' && device === 'PC') {
      setSubMenuData(
        NavbarData.map((item) => {
          if (
            item.title !== '禮物' &&
            item.title !== '關於我們' &&
            item.title !== '登入'
          )
            return item
          return {
            ...item,
            isShow: !item.isShow,
          }
        })
      )
      return
    }

    if (user.accountAuthority === 'admin') {
      setSubMenuData(
        NavbarData.map((item) => {
          if (item.title !== '登入') return item
          return {
            ...item,
            isShow: !item.isShow,
          }
        })
      )
      return
    }
  }, [user, device])

  const handleLogout = async () => {
    try {
      const { data } = await logout()
      if (data.message === 'success') {
        setUser(null)
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '系統問題，請稍候',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return { dropdown, toggleDropdown, hideDropdown, submenuData, handleLogout }
}
