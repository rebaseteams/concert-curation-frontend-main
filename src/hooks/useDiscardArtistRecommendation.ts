import { useState } from 'react';
import { Notification } from '../model/types/errors';
import { PatchRequest } from '../model/types/patch-request';
import { ArtistRecommendationInterface } from '../model/interfaces/artistRecommendation';

export type DiscardArtistRecommendation = {
  loadingForDiscardArtistRecommendation: boolean;
  notification: Notification | undefined;
  discardArtistRecommendation: (arg: PatchRequest) => Promise<void>;
}

export function useDiscardArtistRecommendation(
  artistRecommendation: ArtistRecommendationInterface,
): DiscardArtistRecommendation {
  const [
    loadingForDiscardArtistRecommendation, setLoadingForDiscardArtistRecommendation,
  ] = useState(false);
  const [notification, setNotification] = useState<Notification | undefined>();

  async function discardArtistRecommendation(patchRequest: PatchRequest) {
    setLoadingForDiscardArtistRecommendation(true);
    const response = await artistRecommendation.discardArtist(patchRequest);

    if (response.error) {
      setNotification(
        { status: 'error', message: 'Artist discard failed' },
      );
    } else if (response.data && response.data) {
      setNotification(
        { status: 'success', message: 'Artist sucessfully discarded' },
      );
    }
    setLoadingForDiscardArtistRecommendation(false);
    setTimeout(() => {
      setNotification(undefined);
    }, 100);
  }

  return {
    loadingForDiscardArtistRecommendation,
    notification,
    discardArtistRecommendation,
  };
}

export type UseDiscardArtistRecommendation = (
  artistRecommendation: ArtistRecommendationInterface) => DiscardArtistRecommendation;
