import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistInterface from '../model/interfaces/artist';
import { ArtistNew } from '../model/types/artist';

type ArtistData = {
  artist: ArtistNew | undefined;
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

  useEffect(() => {
    getArtistData();
  }, []);

  return {
    artist,
  };
};

export type UseArtistData = (artistService: ArtistInterface) => ArtistData

export { useArtistData };
