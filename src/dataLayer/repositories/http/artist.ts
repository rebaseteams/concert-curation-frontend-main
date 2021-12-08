/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import ArtistInterface from '../../../model/interfaces/artist';
import { CatchError, GetArtistResponse } from '../../../model/types/service-response';

import { PROD_SERVER } from '../../../config';

export default class ArtistRepo implements ArtistInterface {
  getArtist = async (artistId: string): Promise<GetArtistResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get(`${PROD_SERVER}/artistss/${artistId}`).then((val: any) => {
      if (val.status === 200) {
        resolve({
          error: false, message: val.statusText, data: val.data, status: val.status,
        });
      }
      resolve({ error: true, message: val.statusText, status: val.status });
    }).catch((err: CatchError) => {
      resolve({ error: true, message: err.message, status: err.status });
    });
  })
}
