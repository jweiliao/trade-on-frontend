import { useState, useEffect } from 'react'
import { FrontSubnavMemberData } from './FrontnavData'

import useRWD from '../useRWD'

export default function useSubmenu() {
  // 監控瀏覽器的長寬
  const device = useRWD()
  console.log(device)

  // 下拉選單內容的 state
  const [submenuData, setSubMenuData] = useState([])

  // 是否為管理員
  // const isAdminLogin = true

  useEffect(() => {
    // 如果裝置為 PC 時，下拉選單不顯示 "禮物"、 "關於我們"
    if (device === 'PC') {
      setSubMenuData(FrontSubnavMemberData.filter((item) => item.rwd >= 768))
    } else setSubMenuData(FrontSubnavMemberData)
  }, [device])

  // const isShowAdmin = () => {
  //   if (isAdminLogin) {
  //     setSubMenuData(
  //       submenuData.map((item) => {
  //         if (item.title !== '後台管理') return item
  //         return {
  //           ...item,
  //           isShow: !item.isShow,
  //         }
  //       })
  //     )
  //   }
  // }

  // 用 filter， 只有 isShow 為 true 的資料才被放入 submenuData 中
  // const handleisShowAdmin = useMemo(() => {
  //   return submenuData.filter((item) => {
  //     return item.isShow
  //   })
  // }, [submenuData])

  return { submenuData }
}
