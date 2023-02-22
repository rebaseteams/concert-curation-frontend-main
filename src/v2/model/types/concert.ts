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
}

export type ConcertFilter = {
    search?: string;
}
