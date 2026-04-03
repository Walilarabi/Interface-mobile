import apiClient from './api';

// services/staffApi.js
export const staffApi = {
  // Pointage
  getPointageStatus: (userId: string) => apiClient.get(`/staff/pointage/status/${userId}`),
  startPointage: (data: { user_id: string; qr_code_data: string; location?: any }) => apiClient.post('/staff/pointage/start', data),
  endPointage: (data: { user_id: string; qr_code_data: string; location?: any }) => apiClient.post('/staff/pointage/end', data),
  getHistory: (userId: string, month: string) => apiClient.get(`/staff/pointage/history/${userId}`, { params: { month } }),
  
  // Planning
  getPlanning: (userId: string, month: string) => apiClient.get(`/staff/planning/${userId}`, { params: { month } }),
  
  // RH
  getCongeBalance: (userId: string) => apiClient.get(`/staff/conge-balance/${userId}`),
  requestCP: (data: any) => apiClient.post('/staff/rh/cp', data),
  requestOff: (data: any) => apiClient.post('/staff/rh/off', data),
  requestRetard: (data: any) => apiClient.post('/staff/rh/retard', data),
  requestMaladie: (data: any) => apiClient.post('/staff/rh/maladie', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getRHRequests: (userId: string) => apiClient.get(`/staff/rh/requests/${userId}`),
  
  // Score & Performance
  getScore: (userId: string) => apiClient.get(`/staff/score/${userId}`),
  getRanking: (hotelId: string) => apiClient.get(`/staff/ranking/${hotelId}`),
  getBonus: (userId: string) => apiClient.get(`/staff/bonus/${userId}`),
  
  // Notifications
  getNotifications: (userId: string, unreadOnly?: boolean) => apiClient.get(`/staff/notifications/${userId}`, { params: { unread_only: unreadOnly } }),
  markAsRead: (notificationIds: string[]) => apiClient.post('/staff/notifications/mark-read', { notification_ids: notificationIds }),
  
  // Documents
  getDocuments: (userId: string) => apiClient.get(`/staff/documents/${userId}`),
  postSignature: (documentId: string, signatureData: string) => apiClient.post(`/staff/signature/${documentId}`, { signature_data: signatureData }),
};
