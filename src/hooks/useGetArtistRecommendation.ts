import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistRecommendationInterface } from '../model/interfaces/artistRecommendation';
import { DocumentsInterface } from '../model/interfaces/documents';
import { ARec } from '../model/types/artist-recommendation';
import { Documents } from '../model/types/document/addDocument';
import { Error } from '../model/types/errors';
import { Questions } from '../model/types/questions';

export type GetArtistRecommendation = {
  recommendationId: string | undefined;
  loadingArtistRecommendation: boolean;
  error: Error | undefined;
  getArtistRecommendation: () => Promise<void>;
  artistsData: Array<ARec>;
  concertData: Questions | undefined;
  discardedArtists: Array<ARec>;
  documents: Array<Documents>;
  lastModifiedBy: string;
};

export function useGetArtistRecommendation(
  artistRecommendation: ArtistRecommendationInterface,
  documentsService: DocumentsInterface,
): GetArtistRecommendation {
  const params = useParams();
  const [loadingArtistRecommendation, setLoadingArtistRecommendation] = useState(false);
  const [concertData, setConcertData] = useState<Questions>();
  const [artistsData, setArtistsData] = useState<Array<ARec>>([]);
  const [discardedArtists, setDiscardedArtists] = useState<Array<ARec>>([]);
  const [recommendationId] = useState<string | undefined>(params.recommendationId);
  const [documents, setDocuments] = useState<Array<Documents>>([]);
  const [lastModifiedBy, setLastModifiedBy] = useState<string>('');

  const [error, setError] = useState<Error>();

  async function getArtistRecommendation() {
    setLoadingArtistRecommendation(true);
    const response = await artistRecommendation.getRecommendation(recommendationId || '');
    if (!response) {
      setError({ status: '404', message: 'Internal Error' });
      return;
    }
    if (response.error) {
      setError({
        status: String(response.status),
        message: response.message,
      });
      return;
    }
    if (response.data) {
      setConcertData(response.data.concertData);
      setArtistsData(response.data.artists);
      setDiscardedArtists(response.data.discardedArtists);
      setLastModifiedBy(response.data.lastChangedUserId);
      const documentsRes = await
      documentsService.getDocumentsForRecommendation(response.data.documents);
      if (documentsRes.error) {
        setDocuments([]);
      }
      if (documentsRes.data?.success && documentsRes.data && documentsRes.data.data) {
        setDocuments(documentsRes.data?.data);
      }
    }
    setLoadingArtistRecommendation(false);
  }

  useEffect(() => {
    getArtistRecommendation();
  }, []);

  return {
    recommendationId,
    loadingArtistRecommendation,
    error,
    getArtistRecommendation,
    concertData,
    artistsData,
    discardedArtists,
    documents,
    lastModifiedBy,
  };
}

export type UseGetArtistRecommendation = (
  artistRecommendation: ArtistRecommendationInterface,
  documentsService: DocumentsInterface) => GetArtistRecommendation;
