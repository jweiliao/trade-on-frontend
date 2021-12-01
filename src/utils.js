// get pages's array from total page count
export const getPages = (totalPages) => {
  let pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }
  return pages
}

// convert file size
export const renderSize = (fileSize) => {
  if (null == fileSize || fileSize == '') {
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
