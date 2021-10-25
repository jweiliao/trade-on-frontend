import { FaHome, FaDesktop, FaSignOutAlt } from 'react-icons/fa'

export const BackstageNavbarData = {
  BackstagePage: [
    {
      title: null,
      path: '/backstage',
      icon: <FaHome />,
    },
    {
      title: '會員',
      path: '/backstage/member',
      icon: null,
    },
    {
      title: '物品類別',
      path: '/backstage/category',
      icon: null,
    },
    {
      title: '常見問題',
      path: '/backstage/faq',
      icon: null,
    },
    {
      title: '贈物文',
      path: '/backstage/giving',
      icon: null,
    },
  ],
  FontPage: [
    {
      title: '前台',
      path: '/',
      icon: <FaDesktop />,
    },
    {
      title: '登出',
      path: '/',
      icon: <FaSignOutAlt />,
    },
  ],
}
