import {
  FaUserAlt,
  FaGift,
  FaLayerGroup,
  FaQuestionCircle,
  FaHome,
  FaSignOutAlt,
} from 'react-icons/fa'

export const BackstageNavbarData = {
  BackstagePage: [
    {
      title: '會員',
      path: '/backstage/member',
      icon: <FaUserAlt />,
    },
    {
      title: '贈物文',
      path: '/backstage/giving',
      icon: <FaGift />,
    },
    {
      title: '物品分類',
      path: '/backstage/category',
      icon: <FaLayerGroup />,
    },
    {
      title: '常見問題',
      path: '/backstage/faq',
      icon: <FaQuestionCircle />,
    },
  ],
  FrontPage: [
    {
      title: '前台',
      path: '/',
      icon: <FaHome />,
    },
    {
      title: '登出',
      path: '/',
      icon: <FaSignOutAlt />,
    },
  ],
}
