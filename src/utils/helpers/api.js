import axios from 'axios';
import cookie from 'js-cookie';
import { TOKEN, routes } from '../constants/constants';
import config from '../constants/config';

const request = axios.create({
  baseURL: config.BASE_URL,
  headers: { Authorization: 'Bearer ' + cookie.get(TOKEN) },
});

request.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('/api/authenticate') !== -1) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = routes.LOGIN;
    }
    return Promise.reject(error.response);
  }
);

const api = (options = {}) => {
  return request({
    baseURL: config.BASE_URL,
    ...options,
    headers: {
      Authorization: 'Bearer ' + cookie.get(TOKEN),
      ...options.headers,
    },
  });
};

export default api;
