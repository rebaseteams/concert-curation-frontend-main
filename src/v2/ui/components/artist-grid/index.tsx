import React from 'react';

import { ArtistRecommendation } from '../../../model/types/concert';

export function createArtistGrid(): (
  { list }: { list: Array<ArtistRecommendation> }) => JSX.Element {
  // eslint-disable-next-line
  return function ArtistGrid({ list }: { list: Array<ArtistRecommendation> }): JSX.Element {
    return (
      <div className="m-3 relative border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-b p-2 text-left w-1/6">Artists</th>
              <th className="border-b p-2 text-left w-2/3">Most matching to your concert</th>
              <th className="border-b p-2 text-left w-1/6">{' '}</th>
            </tr>
          </thead>
          <tbody>
            {
              list?.map((artist) => (
                <tr key={artist.id} className="hover:bg-neutral-100">
                  <td className="border-b p-2 text-left text-md hover:text-xl">
                    <div className="flex my-auto">
                      <div className="text-xl px-2 text-white bg-black border border-gray-200 rounded-full">
                        {artist.name.slice(0, 1)}
                      </div>
                      <div className="ml-2 my-auto text-black flex-grow">{artist.name}</div>
                    </div>
                  </td>
                  <td className="border-b p-2 text-left">
                    {
                      // eslint-disable-next-line
                      artist.matchItems?.map((i, idx) => <span key={idx} className="bg-slate-200 p-2 border-none rounded-full mx-1" >{i}</span>)
                    }
                  </td>
                  <td className="border-b p-2 text-right">
                    <span className="bg-teal-500 text-sm p-2 border-none rounded-full mx-1 bold">
                      {artist.matchPercent}
                      % matching
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  };
}
