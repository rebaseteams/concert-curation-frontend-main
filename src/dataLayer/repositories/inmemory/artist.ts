/* eslint-disable @typescript-eslint/no-unused-vars */
import ArtistInterface from '../../../model/interfaces/artist';
import { GetArtistResponse } from '../../../model/types/service-response';
import { artistMockDataNew } from './mockData/artist';

export default class ArtistRepo implements ArtistInterface {
  getArtist = (artistId: string): Promise<GetArtistResponse> => new Promise((resolve) => {
    resolve({
      error: false, data: artistMockDataNew, status: 200, message: 'ok',
    });
  })
}
