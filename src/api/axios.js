import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 🔧 Перехватчик токена
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token && token.trim() !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
