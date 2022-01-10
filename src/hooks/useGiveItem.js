import { useState } from 'react'

export default function useGiveItem() {
  // 設定 "給他禮物" 的彈出視窗的 state
  const [givePopUp, setGivePopUp] = useState(false)
  // 設定 "applyMsgId" 的 state
  const [applyMsgId, setApplyMsgId] = useState({})

  // 1. toggle 彈出視窗：若已顯示，則收起彈窗；否則跳出彈窗
  // 2. 更新 applyMsgId 的 state 為此 message 的 id
  const handleToggleGivePopUp = (msgId) => {
    setGivePopUp(!givePopUp)
    setApplyMsgId(msgId)
  }

  // console.log('apply', applyMsgId)

  return {
    givePopUp,
    handleToggleGivePopUp,
    applyMsgId,
  }
}
