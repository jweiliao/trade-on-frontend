import axios from 'axios'
const config = {
  apiHost: 'http://localhost:8081',
  apiHost2: 'http://184.73.187.145:5000',
}

const instance = axios.create({
  baseURL: config.apiHost2,
})

export default instance
