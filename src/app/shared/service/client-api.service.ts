import axios from 'axios';
import { AUTH_TOKEN } from 'src/app/app.constant';
import { environment } from 'src/environments/environment';

const API = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  }
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ImageAPIHashPost = axios.create({
  baseURL: ''
});

export default API;
