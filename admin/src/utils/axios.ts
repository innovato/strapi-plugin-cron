/**
 * axios with a custom config.
 */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
});

instance.interceptors.request.use(
  async (config) => {
    // @ts-ignore
    config.headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.reload();
    }

    throw error;
  }
);

export default instance;
