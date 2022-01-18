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

// convert file size
export const renderSize = (fileSize) => {
  if (null === fileSize || fileSize === '') {
    return '0 Bytes'
  }
  var unitArr = new Array(
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB'
  )
  let index = 0
  let srcSize = parseFloat(fileSize)
  index = Math.floor(Math.log(srcSize) / Math.log(1024))
  let size = srcSize / Math.pow(1024, index)
  size = size.toFixed(2)
  return size + unitArr[index]
}
