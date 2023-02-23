export type ArtistType = {
    id: string;
    name: string;
    url: string;
    profileAvatar: string
}

export type ArtistFilter = {
    search?: string;
}

export type ArtistDetailsType = {
    id: string;
    name: string;
    url: string;
    cover: string;
    profileAvatar: string;
    location: string;
    type: string;
    genres: Array<string>;
    contact: {
        name: string;
        role: string;
        address: string;
        phone: string;
        email: string;
    }
}
