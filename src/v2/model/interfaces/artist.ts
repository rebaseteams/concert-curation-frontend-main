import { SimpleResourceInterface } from './generics';
import { ArtistDetailsType, ArtistFilter } from '../types/artist';

export type ArtistInterface = SimpleResourceInterface<ArtistDetailsType, ArtistFilter>;
