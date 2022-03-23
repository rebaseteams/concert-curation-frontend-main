import { AssociatedBrands } from './associatedBrands';
import { Questions } from './questions';
import { Venue } from './venue';

export type GenreRes = {
  genreName: string,
  matchPercentage: number,
};

export type ARec = {
    artistName: string,
    artistId: string,
    artistImage: string,
    matchPercentage: number,
    matchAttributes: {
      venues: Array<Venue>;
      age: {
        ageGroup: string,
        matchPercentage: number,
      },
      gender: {
        male: number,
        female: number,
      },
      genre: Array<GenreRes>,
      associatedBrands: Array<AssociatedBrands>;
    };
    summary: string,
};

export type ArtistRecommendation = {
  concertData: Questions;
  artists: Array<ARec>;
  discardedArtists: Array<ARec>;
  status: boolean;
  documents: Array<string>;
  lastChangedUserId: string;
};

export type RecommendtionValidation = {
  eventName: string;
};
