/**
 * axios with a custom config.
 */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const jwtToken = sessionStorage.getItem('jwtToken');
    // @ts-ignore
    config.headers = {
      Authorization: `Bearer ${jwtToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('🚀 ~ Axios Error:', error);
    if (error.response?.status === 401) {
    }
    throw error;
  }
);

export default axiosInstance;
