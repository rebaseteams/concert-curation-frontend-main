import { SimpleResourceInterface } from './generics';
import { ConcertFilter, ConcertType } from '../types/concert';

export type ConcertInterface = SimpleResourceInterface<ConcertType, ConcertFilter>;
