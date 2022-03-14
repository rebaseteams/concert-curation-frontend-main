/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */

import {
  AdvancedSearchQuery,
} from '../types/advancedSearch';
import { AdvancedSearchResponse } from '../types/service-response';

export default interface AdvancedSearchInterface {
    get(query: AdvancedSearchQuery): Promise<AdvancedSearchResponse>,
};
