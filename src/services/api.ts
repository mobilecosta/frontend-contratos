import axios, { AxiosHeaders } from 'axios';

const defaultBaseURL = import.meta.env.PROD
  ? 'https://backend-contratos.vercel.app/api'
  : 'http://localhost:8080';

const baseURL = (import.meta.env.VITE_API_URL ?? defaultBaseURL).replace(/\/$/, '');

export const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
});
