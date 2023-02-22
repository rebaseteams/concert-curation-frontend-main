import { ConcertInterface } from '../../model/interfaces/concert';
import { InMemConcertRepo } from '../repo/in-memory/concert-lists';

// eslint-disable-next-line
export const useConcertService = () => {
  const concertService: ConcertInterface = new InMemConcertRepo();
  return concertService;
};
