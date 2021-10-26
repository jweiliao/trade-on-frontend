import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as BsIcons from 'react-icons/bs'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io5'
import * as ImIcons from 'react-icons/im'

const iconSize = 30

export const FrontSubnavMemberData = [
  {
    title: '禮物',
    path: '/givings',
    icon: <IoIcons.IoGiftSharp size={iconSize} />,
    rwd: 767,
    isShow: true,
  },
  {
    title: '關於我們',
    path: '/about',
    icon: <ImIcons.ImInfo size={iconSize} />,
    rwd: 767,
    isShow: true,
  },
  {
    title: '個人主頁',
    path: '/portfolio',
    icon: <BsIcons.BsPersonCircle size={iconSize} />,
    rwd: 768,
    isShow: true,
  },
  {
    title: '交易記錄',
    path: '/transactions',
    icon: <FaIcons.FaRegFileAlt size={iconSize} />,
    rwd: 768,
    isShow: true,
  },
  {
    title: '後台管理',
    path: '/backstage',
    icon: <RiIcons.RiKey2Fill size={iconSize} />,
    rwd: 768,
    isShow: false,
  },
  {
    title: '登出',
    path: '/logout',
    icon: <FaIcons.FaSignOutAlt size={iconSize} />,
    rwd: 768,
    isShow: true,
  },
]
