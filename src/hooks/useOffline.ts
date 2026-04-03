import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/offlineStorage';
import apiClient from '../services/api';

// hooks/useOffline.js
export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState<any[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadPendingSync = useCallback(async () => {
    const unsynced = await db.syncQueue.toArray();
    setPendingSync(unsynced);
  }, []);

  useEffect(() => {
    loadPendingSync();
  }, [loadPendingSync]);

  const addOfflineAction = useCallback(async (action: string, data: any, endpoint: string) => {
    await db.syncQueue.add({ 
      action, 
      data, 
      timestamp: Date.now(),
      // Adding endpoint to the sync queue object for easier sync
      // @ts-ignore
      endpoint 
    });
    await loadPendingSync();
  }, [loadPendingSync]);

  const syncOfflineActions = useCallback(async () => {
    if (!isOnline) return;
    const unsynced = await db.syncQueue.toArray();
    
    for (const action of unsynced) {
      try {
        // @ts-ignore
        await apiClient.post(action.endpoint || '/sync', action.data);
        await db.syncQueue.delete(action.id!);
      } catch (error) {
        console.error('Sync failed for action:', action.id, error);
      }
    }
    await loadPendingSync();
  }, [isOnline, loadPendingSync]);

  return { isOnline, pendingSync, addOfflineAction, syncOfflineActions };
};
