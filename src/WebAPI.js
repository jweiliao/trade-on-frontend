import axios from 'axios'
const config = {
  apiHost1: 'http://localhost:8081',
  apiHost2: 'http://184.73.187.145:5000',
}

export const instance = axios.create({
  baseURL: config.apiHost2,
})

// 常見問題相關

// 取得常見問題
export const getAllFaqs = instance.get('/commonqnas/all')

// 取得特定一筆常見問題
export const getFaq = (id) => instance.get(`/commonqnas/${id}`)

// 新增常見問題
export const addFaq = (data) => instance.post('/commonqnas/new', data)

// 編輯常見問題
export const updateFaq = (id, data) => instance.put(`/commonqnas/${id}`, data)

// 刪除常見問題
export const deleteFaq = (id) => instance.delete(`/commonqnas/${id}`)

// export default instance
