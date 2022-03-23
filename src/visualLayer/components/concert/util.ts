/* eslint-disable linebreak-style */

import { BrandsInterface } from '../../../model/interfaces/brands';
import { EventsTypeInterface } from '../../../model/interfaces/eventsType';
import { VenuesInterface } from '../../../model/interfaces/venues';
import { QuestionsUI } from '../../../model/types/questions';
import { AddRecommendationResponse } from '../../../model/types/service-response';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ConcertFormProp {
  setVisible: any;
  forms: Array<any>;
  addNewRecommendation(concertData : QuestionsUI): Promise<AddRecommendationResponse>;
  venuesService: VenuesInterface;
  eventsTypeService: EventsTypeInterface;
  brandsService: BrandsInterface;
}
