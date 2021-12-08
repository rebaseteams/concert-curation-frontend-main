import { useEffect, useState } from 'react';
import { ConcertCreationResponse } from '../model/types/questions';
import services from '../visualLayer/services';

interface Error {
  status: string | number | undefined;
  message: string | undefined;
}

export function useGetConcerts() {
  const [loadingForConcerts, setLoadingForConcerts] = useState(false);
  const [error, setError] = useState<Error>();
  const [forms, setForms] = useState<Array<ConcertCreationResponse>>([]);

  async function getRecommendations() {
    setLoadingForConcerts(true);
    const recommendations = await services.ArtistRecommendation.getAllRecommendations();
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

export type UseGetConcerts = () => {
  loadingForConcerts: boolean;
  error: Error | undefined;
  forms: Array<ConcertCreationResponse>;
  getRecommendations: () => Promise<void>;
}
