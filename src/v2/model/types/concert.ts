export type ConcertType = {
    id: string;
    name: string;
    date: string;
    type: string;
    location: string;
    budget: {
        from: string;
        to: string;
    };
    genres: Array<string>;
    targetedGender: string;
    sponsershipType: string;
    recommendedArtists: Array<ArtistRecommendation>;
    preferredBrands: Array<string>;
    notPreferredBrands: Array<string>;
    targetedAge: Array<string>;
}

export type ArtistRecommendation = {
    id: string;
    name: string;
    url: string;
    matchPercent: number;
    matchItems: Array<string>;
}

export type ConcertFilter = {
    search?: string;
}
