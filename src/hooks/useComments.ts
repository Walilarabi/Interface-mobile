
import { useState, useCallback, useEffect } from 'react';
import { crmApi, InternalComment, PlatformComment, SatisfactionScore, TeamScore } from '../services/crmApi';
import { useHotel } from './useHotel';

// hooks/useComments.js
export const useComments = () => {
  const { activeHotel } = useHotel();
  const [internalComments, setInternalComments] = useState<InternalComment[]>([]);
  const [platformComments, setPlatformComments] = useState<PlatformComment[]>([]);
  const [score, setScore] = useState<SatisfactionScore | null>(null);
  const [teamScores, setTeamScores] = useState<{ teams: TeamScore[], team_of_the_month: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const loadInternalComments = useCallback(async () => {
    if (!activeHotel?.id) return;
    setLoading(true);
    try {
      const response = await crmApi.getInternalComments(activeHotel.id);
      setInternalComments(response.data);
    } catch (error) {
      console.error('Error fetching internal comments:', error);
    } finally {
      setLoading(false);
    }
  }, [activeHotel?.id]);

  const loadPlatformComments = useCallback(async () => {
    if (!activeHotel?.id) return;
    setLoading(true);
    try {
      const response = await crmApi.getPlatformComments(activeHotel.id);
      setPlatformComments(response.data);
    } catch (error) {
      console.error('Error fetching platform comments:', error);
    } finally {
      setLoading(false);
    }
  }, [activeHotel?.id]);

  const loadScore = useCallback(async () => {
    if (!activeHotel?.id) return;
    try {
      const response = await crmApi.getSatisfactionScore(activeHotel.id);
      setScore(response.data);
    } catch (error) {
      console.error('Error fetching satisfaction score:', error);
    }
  }, [activeHotel?.id]);

  const loadTeamScores = useCallback(async () => {
    if (!activeHotel?.id) return;
    try {
      const response = await crmApi.getTeamScores(activeHotel.id);
      setTeamScores(response.data);
    } catch (error) {
      console.error('Error fetching team scores:', error);
    }
  }, [activeHotel?.id]);

  useEffect(() => {
    if (activeHotel?.id) {
      loadInternalComments();
      loadPlatformComments();
      loadScore();
      loadTeamScores();
    }
  }, [activeHotel?.id, loadInternalComments, loadPlatformComments, loadScore, loadTeamScores]);

  const markAsRead = useCallback(async (commentId: string) => {
    try {
      await crmApi.markCommentAsRead(commentId);
      await loadInternalComments();
    } catch (error) {
      console.error('Error marking comment as read:', error);
    }
  }, [loadInternalComments]);

  const respondToComment = useCallback(async (commentId: string, response: string) => {
    try {
      await crmApi.respondToComment(commentId, response);
      await loadInternalComments();
    } catch (error) {
      console.error('Error responding to comment:', error);
    }
  }, [loadInternalComments]);

  return { 
    internalComments, 
    platformComments, 
    score, 
    teamScores,
    loading, 
    loadInternalComments, 
    loadPlatformComments, 
    loadScore, 
    markAsRead,
    respondToComment
  };
};
