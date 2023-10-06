import axios from 'axios'

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export function setAuthToken(token) {
  if (token) return API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return delete API.defaults.headers.common['Authorization'];
}