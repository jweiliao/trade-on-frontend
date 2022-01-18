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

// 使用者
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

export const PutAvatar = (id, data) => instance.put(`/users/${id}/avatar`, data)

export const updateUserInfo = (id, data) => instance.put(`/users/${id}`, data)

// 贈物文
export const getAllPosts = (limit) => instance.get(`/posts/all?size=${limit}`)

export const getPost = (id) => instance.get(`/posts/${id}`)

export const getLimitPost = (page, limit, owner, isPublic) =>
  instance.get(
    `/posts/all?page=${page}&size=${limit}&user=${owner}&isPublic=${isPublic}`
  )

export const addPost = (data) => instance.post('/posts/new', data)

export const updatePost = (id, data) => instance.put(`/posts/${id}`, data)

export const deletePost = (id) => instance.delete(`/posts/${id}`)

export const PostPublishStatus = (id) => instance.put(`/posts/${id}/status`)

// 留言
export const getAllMessages = (limit) =>
  instance.get(`/messages/all?size=${limit}`)

export const getPostMessage = (id) => instance.get(`/messages/post/${id}`)

export const getDealMessage = (id) => instance.get(`/messages/deal/${id}`)

export const getMessage = (id) => instance.get(`/messages/${id}`)

export const addMessage = (data) => instance.post('/messages/new', data)

export const replyMessage = (id, data) =>
  instance.post(`/messages/${id}/new`, data)

export const updateMessage = (id, data) => instance.put(`/messages/${id}`, data)

export const deleteMessage = (id) => instance.delete(`/messages/${id}`)

// 交易紀錄
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

// 常見問題
export const getAllFaqs = instance.get(`/commonqnas/all`)

export const getFaq = (id) => instance.get(`/commonqnas/${id}`)

export const addFaq = (data) => instance.post('/commonqnas/new', data)

export const updateFaq = (id, data) => instance.put(`/commonqnas/${id}`, data)

export const deleteFaq = (id) => instance.delete(`/commonqnas/${id}`)

export const getLimitFaq = (page, limit) =>
  instance.get(`/commonqnas/all?page=${page}&size=${limit}`)

// 物品分類
export const getAllCategories = instance.get(`/category/all`)

export const getCategory = (id) => instance.get(`/category/${id}`)

export const addCategory = (data) => instance.post('/category/new', data)

export const updateCategory = (id, data) =>
  instance.put(`/category/${id}`, data)

export const deleteCategory = (id) => instance.delete(`/category/${id}`)





