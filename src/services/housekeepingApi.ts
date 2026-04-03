import apiClient from './api';

// services/housekeepingApi.js
export const housekeepingApi = {
  getAssignedRooms: (userId: string) => apiClient.get(`/housekeeping/rooms/assigned/${userId}`),
  updateRoomStatus: (roomId: string, status: string) => apiClient.patch(`/housekeeping/rooms/${roomId}/status`, { status }),
  createIncident: (data: any) => apiClient.post('/housekeeping/incidents', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};
