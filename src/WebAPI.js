import axios from 'axios'

const config = {
  apiHost1: 'http://localhost:8081',
  apiHost2: 'https:/cosdelus.tw/tradeon/api',
}

export const instance = axios.create({
  baseURL: config.apiHost2,
  headers: { withCredentials: true },
})

// user
export const register = async (email, nickname, password, confirmPassword) =>
  await instance.post('/users/register', {
    email,
    nickname,
    password,
    confirmPassword,
  })

export const login = async (email, password) =>
  await instance.post('/users/login', { email, password })

export const getMe = async () => await instance.get(`/users/me`)

export const logout = async () => await instance.get('/users/logout')

// post
export const getAllPosts = (limit) => instance.get(`/posts/all?size=${limit}`)

export const getPost = (id) => instance.get(`/posts/${id}`)

export const addPost = (data) => instance.post(`/posts/new`, data)

export const updatePost = (id, data) => instance.post(`/posts/${id}`, data)

export const deletePost = (id) => instance.delete(`/posts/${id}`)

export const getLimitPost = (page, limit, owner, isPublic) =>
  instance.get(
    `/posts/all?page=${page}&size=${limit}&user=${owner}&isPublic=${isPublic}`
  )

// faq
export const getAllFaqs = (limit) =>
  instance.get(`/commonqnas/all?size=${limit}`)

export const getFaq = (id) => instance.get(`/commonqnas/${id}`)

export const addFaq = (data) => instance.post('/commonqnas/new', data)

export const updateFaq = (id, data) => instance.put(`/commonqnas/${id}`, data)

export const deleteFaq = (id) => instance.delete(`/commonqnas/${id}`)

export const getLimitFaq = (page, limit) =>
  instance.get(`/commonqnas/all?page=${page}&size=${limit}`)
