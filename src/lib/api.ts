import axios from "axios"

const instance = axios.create({
  baseURL: "https://tas-flow-backend.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  }, // ajuste conforme o backend
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default instance