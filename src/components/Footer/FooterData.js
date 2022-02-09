import * as FaIcons from 'react-icons/fa'
const iconSize = 30

export const FooterData = {
  help: [
    {
      title: '常見問題',
      link: '/faq',
    },
    {
      title: '隱私權政策',
      link: '/privacy',
    },
    {
      title: '服務條款',
      link: '/terms',
    },
  ],
  follow: [
    {
      title: <FaIcons.FaGithub size={iconSize} />,
      link: 'https://github.com/Jane0901/trade-on-frontend',
    },
    {
      title: <FaIcons.FaInstagram size={iconSize} />,
      link: '#',
    },
    {
      title: <FaIcons.FaFacebookSquare size={iconSize} />,
      link: '#',
    },
  ],
}
