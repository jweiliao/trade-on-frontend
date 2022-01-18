import { useState } from 'react'

export default function useWantItem() {
  // 設定申請索取的彈出視窗的 state
  const [wantPopUp, setWantPopUp] = useState(false)

  // toggle 彈出視窗：若已顯示，則收起彈窗；否則跳出彈窗
  const handleToggleWantPopUp = (id) => {
    setWantPopUp(!wantPopUp)
  }

  return {
    wantPopUp,
    handleToggleWantPopUp,
  }
}
