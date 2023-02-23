import { ArtistFilter, ArtistDetailsType } from '../../../model/types/artist';
import { createUseResources, UseResources } from '../generic/use-resources';
import { ArtistInterface } from '../../../model/interfaces/artist';
import { useArtistService } from '../../services/artist';

export type UseArtists = UseResources<ArtistDetailsType, ArtistFilter>;

export function createUseArtists(): UseArtists {
  return createUseResources<ArtistDetailsType, ArtistFilter, ArtistInterface>(
    { useService: useArtistService },
  );
}
