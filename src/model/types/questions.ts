import { ArtistBudget } from './artist-budget';
import { NewBrandResponse } from './brand';
import { NewEventsTypeResponseData } from './eventsType';
import { NewVenueResponseData } from './venue';

import { TargetAudience } from './target-audience';
import { WhatSellsMost } from './what-sells-most';

export type Questions = {
        id: string;
        userId: string;
        concertName: string;
        eventType: NewEventsTypeResponseData;
        venue: Array<NewVenueResponseData>;
        artistBudget: ArtistBudget;
        sponsorshipType: string,
        wantedBrands: Array<NewBrandResponse>;
        unwantedBrands: Array<NewBrandResponse>;
        targetAudience: TargetAudience;
        whatSellsMost: WhatSellsMost;
        dateCreated: string;
}

export type QuestionsUI = {
        userId: string;
        concertName: string;
        eventType: string;
        venue: string[];
        artistBudget:{'min': number, 'max':number};
        sponsorshipType :string;
        wantedBrands: Array<string>;
        unwantedBrands: Array<string>;
        targetAudience: TargetAudience;
        whatSellsMost: WhatSellsMost;
}

export type ConcertCreationResponse = {
        id: string;
        concertName: string;
        status: boolean;
        dateCreated: string;
}
