/* eslint-disable @typescript-eslint/no-unused-vars */
import ArtistInterface from '../../../model/interfaces/artist';
import { GetArtistResponse } from '../../../model/types/service-response';
import { artistMockData } from './mockData/artist';

export default class ArtistRepo implements ArtistInterface {
  getArtist = (artistId: string): Promise<GetArtistResponse> => new Promise((resolve) => {
    resolve({
      error: false, data: artistMockData, status: 200, message: 'ok',
    });
  })
}
