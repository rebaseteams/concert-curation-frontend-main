import React from 'react';
import { Link } from 'react-router-dom';

import { ArtistRecommendation } from '../../../model/types/concert';

export function createArtistCard(): ({ card }: { card: ArtistRecommendation }) => JSX.Element {
  return function ArtistCard({ card }: { card: ArtistRecommendation }): JSX.Element {
    return (
      <Link to={`/v2/artists/${card.id}`}>
        <div className="m-3 relative">
          <div className="h-min overflow-hidden rounded-md my-2">
            <img
              className="h-60 w-full hover:scale-125 transition-all duration-500 cursor-pointer"
              src={`${card.url}`}
              alt=""
            />
          </div>
          <div className="text-xs absolute left-1 top-5 bg-teal-200 px-3 py-1 border-none rounded-full">
            {card.matchPercent}
            % matching
          </div>
          <div className="flex my-auto">
            <div className="text-lg px-2 text-white bg-black border border-gray-200 rounded-full">
              {card.name.slice(0, 1)}
            </div>
            <div className="ml-2 text-lg my-auto text-black flex-grow">{card.name}</div>
            <div className="text-sm my-auto text-gray-700 flex-none italic">
              {card.matchItems?.length}
              {' '}
              items matching
            </div>
          </div>
        </div>
      </Link>
    );
  };
}
