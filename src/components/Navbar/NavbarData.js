import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as BsIcons from 'react-icons/bs'
import * as IoIcons from 'react-icons/io5'
import * as ImIcons from 'react-icons/im'

const iconSize = 30

export const NavbarData = [
  {
    title: '禮物',
    path: '/givings',
    icon: <IoIcons.IoGiftSharp size={iconSize} />,
    isShow: true,
  },
  {
    title: '關於我們',
    path: '/about',
    icon: <ImIcons.ImInfo size={iconSize} />,
    isShow: true,
  },
  {
    title: '登入',
    path: '/login',
    icon: <FaIcons.FaSignInAlt size={iconSize} />,
    isShow: true,
  },
  {
    title: '個人主頁',
    path: '/portfolio',
    icon: <BsIcons.BsPersonCircle size={iconSize} />,
    isShow: true,
  },
  {
    title: '交易記錄',
    path: '/transactions',
    icon: <FaIcons.FaRegFileAlt size={iconSize} />,
    isShow: true,
  },
  {
    title: '後台管理',
    path: '/backstage',
    icon: <ImIcons.ImCog size={iconSize} />,
    isShow: true,
  },
  {
    title: '登出',
    path: '/',
    icon: <FaIcons.FaSignOutAlt size={iconSize} />,
    isShow: true,
  },
]
