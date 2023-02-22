import { ConcertInterface } from '../../model/interfaces/concert';
import { InMemConcertRepo } from '../repo/in-memory/concert-lists';

export const useConcertService = () => {
    const concertService: ConcertInterface = new InMemConcertRepo();
    return concertService;
} 