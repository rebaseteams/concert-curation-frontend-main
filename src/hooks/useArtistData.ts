import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ArtistInterface from '../model/interfaces/artist';
import { ArtistNew } from '../model/types/artist';

type ArtistData = {
  artist: ArtistNew | undefined;
  recommendationId: string;
}

const useArtistData = (artistService: ArtistInterface): ArtistData => {
  const [artist, setArtist] = useState<ArtistNew>();
  const { id } = useParams();

  const getArtistData = async () => {
    const response = await artistService.getArtist(id || '');
    if (response.error) {
      return;
    }
    setArtist(response.data);
  };

  const location = useLocation();

  let recommendationId = '';
  if (location.state) {
    recommendationId = location.state;
  }

  useEffect(() => {
    getArtistData();
  }, []);

  return {
    artist,
    recommendationId,
  };
};

export type UseArtistData = (artistService: ArtistInterface) => ArtistData

export { useArtistData };
