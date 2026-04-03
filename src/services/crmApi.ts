
import apiClient from './api';

export interface InternalComment {
  id: string;
  location: 'room' | 'restaurant' | 'spa' | 'fitness' | 'pool' | 'hall';
  room_number: string | null;
  rating: number; // 1-10
  comment: string;
  created_at: string;
  status: 'new' | 'read' | 'responded';
}

export interface PlatformComment {
  id: string;
  platform: 'booking' | 'expedia' | 'tripadvisor' | 'google' | 'facebook';
  rating: number; // 1-5
  comment: string;
  guest_name: string | null;
  date: string;
  response: string | null;
}

export interface SatisfactionScore {
  global_score: number; // 0-100
  internal_score: number;
  platform_score: number;
  evolution: number; // e.g. +5
  breakdown: {
    room: number;
    restaurant: number;
    spa: number;
    fitness: number;
  };
}

export interface TeamScore {
  team: string;
  score: number;
  positive_comments: number;
}

// services/crmApi.js
export const crmApi = {
  getInternalComments: (hotelId: string, limit = 50) => 
    apiClient.get(`/crm/comments/internal`, { params: { hotel_id: hotelId, limit } }),
  
  getPlatformComments: (hotelId: string, limit = 50) => 
    apiClient.get(`/crm/comments/platform`, { params: { hotel_id: hotelId, limit } }),
  
  getSatisfactionScore: (hotelId: string, period = 'month') => 
    apiClient.get(`/crm/satisfaction-score`, { params: { hotel_id: hotelId, period } }),
  
  markCommentAsRead: (commentId: string) => 
    apiClient.patch(`/crm/comments/internal/${commentId}/read`),
  
  respondToComment: (commentId: string, response: string) => 
    apiClient.post(`/crm/comments/internal/${commentId}/respond`, { response }),

  getTeamScores: (hotelId: string) => 
    apiClient.get(`/crm/team-scores`, { params: { hotel_id: hotelId } }),
};
