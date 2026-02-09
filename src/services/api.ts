import axios from 'axios';

const defaultBaseURL = import.meta.env.PROD
  ? 'https://backend-contratos.vercel.app'
  : 'http://localhost:8080';

const baseURL = (import.meta.env.VITE_API_URL ?? defaultBaseURL).replace(/\/$/, '');

export const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    if (config.headers && typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${token}`
      };
    }
  }
  return config;
});
