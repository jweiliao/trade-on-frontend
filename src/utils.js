// get pages's array from total page count
export const getPages = (totalPages) => {
  let pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }
  return pages
}
