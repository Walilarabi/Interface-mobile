import { useState, useCallback } from 'react';
import { staffApi } from '../services/staffApi';

// hooks/useStaff.js
export const useStaff = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const getPlanning = useCallback(async (month: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.getPlanning(userId, month);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const startPointage = useCallback(async (qrCodeData: string, location?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.startPointage({ user_id: userId, qr_code_data: qrCodeData, location });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const endPointage = useCallback(async (qrCodeData: string, location?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.endPointage({ user_id: userId, qr_code_data: qrCodeData, location });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const requestCP = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.requestCP({ ...data, user_id: userId });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const requestOff = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.requestOff({ ...data, user_id: userId });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const requestRetard = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.requestRetard({ ...data, user_id: userId });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const requestMaladie = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      formData.append('user_id', userId);
      const response = await staffApi.requestMaladie(formData);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const getScore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.getScore(userId);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const getRanking = useCallback(async (hotelId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.getRanking(hotelId);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getNotifications = useCallback(async (unreadOnly?: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.getNotifications(userId, unreadOnly);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { 
    loading, 
    error, 
    getPlanning, 
    startPointage, 
    endPointage, 
    requestCP, 
    requestOff, 
    requestRetard, 
    requestMaladie, 
    getScore, 
    getRanking, 
    getNotifications 
  };
};
