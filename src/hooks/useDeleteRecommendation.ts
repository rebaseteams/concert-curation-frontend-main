import { useState } from 'react';
import { Notification } from '../model/types/errors';
import { ArtistRecommendationInterface } from '../model/interfaces/artistRecommendation';

export type DeleteRecommendation = {
  loadingForDeleteRecommendation: boolean;
  notification: Notification | undefined;
  deleteRecommendation: (arg: string) => Promise<void>;
}

export function useDeleteRecommendation(
  artistRecommendation: ArtistRecommendationInterface,
): DeleteRecommendation {
  const [
    loadingForDeleteRecommendation, setLoadingForDeleteRecommendation,
  ] = useState(false);
  const [notification, setNotification] = useState<Notification | undefined>();

  async function deleteRecommendation(recommendationId: string) {
    setLoadingForDeleteRecommendation(true);
    const response = await artistRecommendation.deleteRecommendation(recommendationId);

    if (response.error) {
      setNotification(
        { status: 'error', message: 'Concert deletion failed' },
      );
    } else if (response.data && response.data) {
      setNotification(
        { status: 'success', message: 'Concert sucessfully deleted' },
      );
    }
    setLoadingForDeleteRecommendation(false);
    setTimeout(() => {
      setNotification(undefined);
    }, 100);
  }

  return {
    loadingForDeleteRecommendation,
    notification,
    deleteRecommendation,
  };
}

export type UseDeleteRecommendation = (
  artistRecommendation: ArtistRecommendationInterface) => DeleteRecommendation;
