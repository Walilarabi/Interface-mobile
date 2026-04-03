import axios from 'axios';
import * as mockData from './mockData';

// services/api.js – Client Axios unifié
const apiClient = axios.create({
  // Use VITE_API_URL if available, otherwise fallback to mock endpoint
  baseURL: (import.meta as any).env.VITE_API_URL || 'https://api.flowtym.com/v1',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock Interceptor for development/demo
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If it's a network error or 404, we return mock data for specific paths
    const { config } = error;
    if (!config) return Promise.reject(error);

    const url = config.url || '';
    
    // CRM Mocks
    if (url.includes('/crm/comments/internal')) {
      return { data: mockData.mockInternalComments, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/crm/comments/platform')) {
      return { data: mockData.mockPlatformComments, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/crm/satisfaction-score')) {
      return { data: mockData.mockSatisfactionScore, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/crm/team-scores')) {
      return { data: mockData.mockTeamScores, status: 200, statusText: 'OK', headers: {}, config };
    }

    // Staff Mocks
    if (url.includes('/staff/score/')) {
      return { data: mockData.mockStaffScore, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/staff/ranking/')) {
      return { data: mockData.mockRanking, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/staff/notifications/')) {
      return { data: mockData.mockNotifications, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/staff/planning/')) {
      return { data: mockData.mockPlanning, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/staff/conge-balance/')) {
      return { data: mockData.mockCongeBalance, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/staff/rh/requests/')) {
      return { data: mockData.mockRHRequests, status: 200, statusText: 'OK', headers: {}, config };
    }
    if (url.includes('/staff/pointage/status/')) {
      return { data: { active: false }, status: 200, statusText: 'OK', headers: {}, config };
    }

    // Default to rejecting if no mock found
    return Promise.reject(error);
  }
);

export default apiClient;
