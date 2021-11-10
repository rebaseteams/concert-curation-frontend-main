export interface ArtistsDataInterface {
  artistName: string,
  artistId: string,
  artistImage: string,
  matchPercentage: number,
  matchAttributes: {
    venues: Array<
      {
        id: string,
        name: string,
        address: {
          pincode: number,
          country: string,
          city: string,
          geoLocation: {
            lat: number,
            long: number,
          },
        },
        venueCapacity: number,
        matchPercentage: number,
      }>;
    age: {
      ageGroup: string,
      matchPercentage: number,
    },
    gender: {
      male: number,
      female: number,
    },
    genre: [
      {
        genreName: string,
        matchPercentage: number,
      },
    ],
    associatedBrands: Array<
      {
        id: string,
        name: string,
        contact: string,
        website: string,
        logoUrl: string,
      }>;
  };
  summary: string,
}

export interface ConcertDataInterface {
  id: string;
  concertName: string;
  eventType: string;
  venue: Array<string>;
  artistBudget: { min: number, max: number },
  sponsorshipType: string;
  wantedBrands: string;
  unwantedBrands: Array<string>;
  targetAudience: {
    ageGroup: Array<string>;
    gender: Array<string>;
    genre: Array<string>;
  },
}

export interface RecommendedData {
  id: string;
  concertData: ConcertDataInterface;
  artists: Array<ArtistsDataInterface>;
}
