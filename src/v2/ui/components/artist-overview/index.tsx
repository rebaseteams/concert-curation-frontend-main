import React from 'react';
import { Link } from 'react-router-dom';

export function createArtistOverview(): (
  { id }: { id: string }) => JSX.Element {
  // eslint-disable-next-line
  return function ArtistOverview({ id }: { id: string; }): JSX.Element {
    return (

      <div>
        <div className="flex flex-row py-2 px-4">
          <div className="basis-1/2 h-48 bg-white mx-2 border border-gray-200 rounded-lg">
            <div className="h-full text-center my-auto mx-auto">Popularity Chart will come here</div>
          </div>
          <div className="basis-1/2 h-48 bg-white mx-2 border border-gray-200 rounded-lg">
            <div className="h-full text-center my-auto mx-auto">Affinity Chart will come here</div>
          </div>
        </div>

        <div className="my-2">
          <div className="bold text-md px-4 mx-4">
            Latest release
          </div>
          <div className="bold text-xs px-4 mx-4">
            <img alt="youtube" src="/social/youtube.png" className="inline w-4 h-3" />
            Youtube
          </div>
          <div className="flex flex-row py-2 px-4">
            {
              [1, 2, 3].map((c) => (
                <div key={c} className="basis-1/3 mx-2">
                  <div className="text-center my-auto mx-auto">
                    <iframe title="bones" className="w-full h-60 border border-gray-200 rounded-lg" src="https://www.youtube.com/embed/u0beuKgcgvk" />
                  </div>
                  <div className="ml-2">
                    <div className="bold text-sm">Bones</div>
                    <div className="text-xs text-gray-500">289K views - 2 months ago</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="my-2">
          <div className="bold text-xs px-4 mx-4">
            <img alt="spotify" src="/social/spotify.png" className="inline w-4 h-3" />
            Spotify
          </div>
          <div className="flex flex-row py-2 px-4">
            {
              [1, 2, 3, 4].map((c) => (
                <div key={c} className="basis-1/3 mx-2">
                  <div className="text-center my-auto mx-auto">
                    <img src={`/spotify-playlists/${c}.png`} alt={`${c}`} className="h-52 w-full border border-gray-200 rounded-lg" />
                  </div>
                  <div className="ml-2">
                    <div className="bold text-sm">Bones</div>
                    <div className="text-xs text-gray-500">2 months ago</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="my-2">
          <div className="bold text-md px-4 mx-4">
            Similar Artists
          </div>
          <div className="flex flex-row py-2 px-4">
            {
              [1, 2, 3].map((c) => (
                <div key={c} className="basis-1/3 mx-2">
                  <div className="text-center my-auto mx-auto">
                    <Link to="/artists/1">
                      <img alt={`${c}`} className="w-full h-60 border border-gray-200 rounded-lg" src={`/artist/${c}.png`} />
                    </Link>
                  </div>
                  <div className="ml-2">
                    <div className="bold text-sm">Bones</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  };
}
