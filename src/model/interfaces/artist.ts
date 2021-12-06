/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { GetArtistResponse } from '../types/service-response';

export default interface ArtistInterface {
  getArtist: (artistId: string) => Promise<GetArtistResponse>,
};
