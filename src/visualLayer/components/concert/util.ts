/* eslint-disable linebreak-style */

import { VenuesInterface } from '../../../model/interfaces/venues';
import { QuestionsUI } from '../../../model/types/questions';
import { AddRecommendationResponse } from '../../../model/types/service-response';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ConcertFormProp {
  setVisible: any;
  forms: Array<any>;
  addNewRecommendation(concertData : QuestionsUI): Promise<AddRecommendationResponse>;
  venuesService: VenuesInterface
}
