import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // variável do .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
