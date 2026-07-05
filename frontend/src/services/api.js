import axios from 'axios';

const fallbackBaseUrl = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : '/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || fallbackBaseUrl,
  timeout: 12000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tourmedx_admin_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('tourmedx_admin_token');
      if (
        window.location.pathname.startsWith('/admin') &&
        window.location.pathname !== '/admin/login'
      ) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export async function requestWithFallback(requester, fallbackValue) {
  try {
    const response = await requester();
    return response.data;
  } catch (_error) {
    return fallbackValue;
  }
}

export async function fetchCollection(endpoint, fallbackValue = []) {
  return requestWithFallback(() => api.get(endpoint), fallbackValue);
}

export async function fetchResource(endpoint, fallbackValue = null) {
  return requestWithFallback(() => api.get(endpoint), fallbackValue);
}

export async function postResource(endpoint, payload) {
  const response = await api.post(endpoint, payload);
  return response.data;
}

export async function putResource(endpoint, payload) {
  const response = await api.put(endpoint, payload);
  return response.data;
}

export async function deleteResource(endpoint) {
  const response = await api.delete(endpoint);
  return response.data;
}

export default api;
