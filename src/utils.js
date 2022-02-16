// 設定 token 變數
const TOKEN_NAME = 'token'

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}

// 從 localStorage 取得 token 的資料
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}
