import axios from 'axios'
const config = {
  apiHost1: 'http://localhost:8081',
  apiHost2: 'http://184.73.187.145:5000',
}

export const instance = axios.create({
  baseURL: config.apiHost2,
})

export const deleteFaq = (id) => instance.delete(`/commonqnas/${id}`)

// export default instance
