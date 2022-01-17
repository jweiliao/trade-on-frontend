import axios from 'axios'
import { getAuthToken } from './utils'
import Swal from 'sweetalert2'

const config = {
  apiHost1: 'http://localhost:8081',
  apiHost2: 'https://cosdelus.tw/tradeon/api',
}

const instance = axios.create({
  baseURL: config.apiHost2,
})

instance.interceptors.request.use((config) => {
  config.headers.withCredentials = true
  config.headers.Authorization = `Bearer ${getAuthToken()}`
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 500:
          Swal.fire('系統問題，請稍候')
          break
        default:
          Swal.fire('發生錯誤！')
      }
    }
    return Promise.reject(err)
  }
)

// user
export const register = (email, nickname, password, confirmPassword) =>
  instance.post('/users/register', {
    email,
    nickname,
    password,
    confirmPassword,
  })

export const login = (email, password) =>
  instance.post('/users/login', { email, password })

export const getMe = () => instance.get('/users/me')

export const getUser = (id) => instance.get(`/users/${id}`)

export const getUserRecord = (id, limit, type, status) =>
  instance.get(
    `/users/${id}/record?size=${limit}&type=${type}&status=${status}`
  )

// transaction
export const getAllTransactions = (limit) =>
  instance.get(`/transactions/all?size=${limit}`)

export const getTransaction = (id) => instance.get(`/transactions/${id}`)

export const cancelTransaction = (id) =>
  instance.put(`/transactions/${id}/cancel`)

export const updateShippingInfo = (id, data) =>
  instance.put(`/transactions/${id}/filling-info`, data)

export const checkPayment = (id) => instance.put(`/transactions/${id}/payment`)

export const checkComplete = (id) =>
  instance.put(`/transactions/${id}/complete`)

// message
export const getDealMessage = (id) => instance.get(`/messages/deal/${id}`)

export const addMessage = (data) => instance.post('/messages/new', data)

export const deleteMessage = (id) => instance.delete(`/messages/${id}`)

// faq
export const getAllFaqs = (limit) =>
  instance.get(`/commonqnas/all?size=${limit}`)

export const getFaq = (id) => instance.get(`/commonqnas/${id}`)

export const addFaq = (data) => instance.post('/commonqnas/new', data)

export const updateFaq = (id, data) => instance.put(`/commonqnas/${id}`, data)

export const deleteFaq = (id) => instance.delete(`/commonqnas/${id}`)

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

/***************
   贈物文相關
***************/

// 取得贈物文
export const getAllPosts = (limit) => instance.get(`/posts/all?size=${limit}`)

// 取得特定一筆贈物文
export const getPost = (id) => instance.get(`/posts/${id}`)

// 取得特定某幾筆贈物文（篩選：頁碼、每頁多少筆、發文者、上下架）
export const getLimitPost = (page, limit, owner, isPublic) =>
  instance.get(
    `/posts/all?page=${page}&size=${limit}&user=${owner}&isPublic=${isPublic}`
  )

// 新增贈物文
export const addPost = (data) => instance.post('/posts/new', data)

// 編輯贈物文
export const updatePost = (id, data) => instance.put(`/posts/${id}`, data)

// 刪除贈物文
export const deletePost = (id) => instance.delete(`/posts/${id}`)

// 上架或下架贈物文
export const PostPublishStatus = (id) => instance.put(`/posts/${id}/status`)
