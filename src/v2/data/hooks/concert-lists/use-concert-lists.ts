import { ConcertFilter, ConcertType } from '../../../model/types/concert';
import { createUseResources, UseResources } from '../generic/use-resources';
import { ConcertInterface } from '../../../model/interfaces/concert';
import { useConcertService } from '../../services/concert';

export type UseConcerts = UseResources<ConcertType, ConcertFilter>;

export function createUseConcerts(): UseConcerts {
  return createUseResources<ConcertType, ConcertFilter, ConcertInterface>(
    { useService: useConcertService },
  );
}
