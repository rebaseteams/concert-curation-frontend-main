import React from 'react';
import { ArtistDetailsType } from '../../../model/types/artist';

export function createArtistContact(): (
  { artist }: { artist: ArtistDetailsType }) => JSX.Element {
  // eslint-disable-next-line
  return function ArtistContact({ artist }: { artist: ArtistDetailsType; }): JSX.Element {
    return (
      <div>
        <div className="text-2xl my-3">Want to connect? Just reach out to</div>
        <div className="text-xl bold px-3 my-2">{artist.contact?.name}</div>
        <div className="text-xs bold px-3">{artist.contact?.role}</div>

        <div className="m-3">
          <div className="text-gray-800 text-xs">Address</div>
          <div className="text-sm">{artist.contact?.address}</div>
        </div>

        <div className="m-3">
          <div className="text-gray-800 text-xs">Phone</div>
          <div className="text-sm">{artist.contact?.phone}</div>
        </div>

        <div className="m-3">
          <div className="text-gray-800 text-xs">Email</div>
          <div className="text-sm">{artist.contact?.email}</div>
        </div>
      </div>
    );
  };
}
