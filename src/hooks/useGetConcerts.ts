import { useEffect, useState } from 'react';
import { ArtistRecommendationInterface } from '../model/interfaces/artistRecommendation';
import { ConcertCreationResponse } from '../model/types/questions';
import { Error } from '../model/types/errors';

export function useGetConcerts(artistRecommendation: ArtistRecommendationInterface) {
  const [loadingForConcerts, setLoadingForConcerts] = useState(false);
  const [error, setError] = useState<Error>();
  const [forms, setForms] = useState<Array<ConcertCreationResponse>>([]);

  async function getRecommendations() {
    setLoadingForConcerts(true);
    const recommendations = await artistRecommendation.getAllRecommendations();
    if (recommendations.error) {
      setError({ status: recommendations.status, message: recommendations.message });
    } else {
      setForms(recommendations.data);
    }
    setLoadingForConcerts(false);
  }

  useEffect(() => {
    getRecommendations();
  }, []);

  return {
    loadingForConcerts,
    error,
    forms,
    getRecommendations,
  };
}

export type UseGetConcerts = (artistRecommendation: ArtistRecommendationInterface) => {
  loadingForConcerts: boolean;
  error: Error | undefined;
  forms: Array<ConcertCreationResponse>;
  getRecommendations: () => Promise<void>;
}
