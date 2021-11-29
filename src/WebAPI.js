import axios from 'axios'
const config = {
  apiHost1: 'http://localhost:8081',
  apiHost2: 'http://184.73.187.145:5000',
  apiHost3: 'https://cosdelus.tw/tradeon/api/',
}

export const instance = axios.create({
  baseURL: config.apiHost3,
})

/***************
   常見問題相關
***************/

// 取得常見問題
export const getAllFaqs = (limit) =>
  instance.get(`/commonqnas/all?size=${limit}`)

// 取得特定一筆常見問題
export const getFaq = (id) => instance.get(`/commonqnas/${id}`)

// 新增常見問題
export const addFaq = (data) => instance.post('/commonqnas/new', data)

// 編輯常見問題
export const updateFaq = (id, data) => instance.put(`/commonqnas/${id}`, data)

// 刪除常見問題
export const deleteFaq = (id) => instance.delete(`/commonqnas/${id}`)

// 根據參數 page、limit 拿到限定第幾頁且每頁多少篇的文章
export const getLimitFaq = (page, limit) =>
  instance.get(`/commonqnas/all?page=${page}&size=${limit}`)

/***************
   分類相關
***************/

// 取得分類
export const getAllCategories = (limit) =>
  instance.get(`/category/all?size=${limit}`)

// 取得特定一筆分類
export const getCategory = (id) => instance.get(`/category/${id}`)

// 新增分類
export const addCategory = (data) => instance.post('/category/new', data)

// 編輯分類
export const updateCategory = (id, data) =>
  instance.put(`/category/${id}`, data)

// 刪除分類
export const deleteCategory = (id) => instance.delete(`/category/${id}`)

// export default instance
