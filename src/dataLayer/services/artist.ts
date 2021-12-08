import ArtistInterface from '../../model/interfaces/artist';
import { GetArtistResponse } from '../../model/types/service-response';

export default class Artist implements ArtistInterface {
  private artistRepo: ArtistInterface;

  constructor(artistRepo: ArtistInterface) {
    this.artistRepo = artistRepo;
  }

  getArtist = async (artistId: string):
  Promise<GetArtistResponse> => new Promise((resolve) => {
    this.artistRepo.getArtist(artistId).then((val) => {
      resolve(val);
    });
  })
}
