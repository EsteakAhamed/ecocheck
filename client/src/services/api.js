// client/src/services/api.js — Axios client for backend communication
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000, // 60s — Puppeteer can be slow on heavy pages
});

/** POST /api/carbon/analyze — triggers full page audit pipeline */
export const analyzeWebsite = async (url) => {
  const response = await apiClient.post('/carbon/analyze', { url });
  return response.data;
};

/** GET /api/carbon/reports — retrieves last 50 audit records */
export const getReports = async () => {
  const response = await apiClient.get('/carbon/reports');
  return response.data;
};
