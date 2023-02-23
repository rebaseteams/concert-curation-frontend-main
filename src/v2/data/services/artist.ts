import { ArtistInterface } from '../../model/interfaces/artist';
import { InMemArtistRepo } from '../repo/in-memory/artist-lists';

// eslint-disable-next-line
export const useArtistService = () => {
  const artistService: ArtistInterface = new InMemArtistRepo();
  return artistService;
};
