/**
 * axios with a custom config.
 */
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
})
console.debug("we need to get the token)");
instance.interceptors.request.use(
  async (config) => {
    // @ts-ignore
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
//      auth.clearAppStorage()
localStorage.clearItem("token")
      window.location.reload()
    }

    throw error
  }
)

export default instance
