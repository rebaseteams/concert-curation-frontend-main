import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseArtists } from '../../../data/hooks/artist-lists/use-artist-lists';
import { ArtistDetailsType } from '../../../model/types/artist';

export function createArtistDetails(): (props: { useArtists: UseArtists }) => JSX.Element {
  return function ArtistDetails({ useArtists }: { useArtists: UseArtists }): JSX.Element {
    const { id } = useParams();
    const { getSync: getArtistById } = useArtists();
    const [artist, setArtist] = useState<ArtistDetailsType>({} as ArtistDetailsType);

    useEffect(() => {
      if (id) {
        getArtistById(id)
          .then((res) => {
            setArtist(res);
          });
      }
    }, [id]);

    return (
      <div className="text-black bg-neutral-100">
        <div id="cover">
          <div className="bg-cover bg-center h-48" style={{ backgroundImage: `url(${artist.cover})` }} />
          <div className="relative">
            <div className="border-4 border-white absolute -top-20 left-6 rounded-full w-24 h-24">
              <img className="w-full h-full border-none rounded-full" alt={artist.name} src={artist.profileAvatar} />
            </div>
          </div>
        </div>
        <div className="flex py-4 px-6 mt-2">
          <div className="flex-grow">
            <div className="flex">
              <div className="text-xl bold my-1">
                { artist.name }
              </div>
              <div className="text-gray-500 text-xs my-2 mx-2 w-24 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 inline">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {' '}
                { artist.location }
              </div>

              <div className="flex-none w-6 my-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                </svg>
              </div>

              <div className="flex-none w-6 my-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>

            </div>
            <div className="text-xs bold my-1">
              {artist.type}
            </div>
            <div className="text-xs my-1">
              { artist.genres?.slice(0, 3).join(' | ') }
              { artist.genres?.length > 3
                ? (
                  <span className="mx-2 bg-black text-white p-1 border-none rounded-full">
                    +
                    {artist.genres?.length - 3}
                  </span>
                ) : null}
            </div>
            <div className="text-xs my-1">
              <span className="text-blue-500 bold">View more...</span>
            </div>
          </div>
          <div className="flex-none mx-3 text-xs my-auto">
            <div className="flex">
              <div className="my-auto mr-1">
                <img src="/social/youtube.png" alt="youtube" className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Youtube</div>
                <div className="bold text-md text-center">212.5K</div>
              </div>
            </div>
          </div>
          <div className="flex-none mx-3 text-xs my-auto">
            <div className="flex">
              <div className="my-auto mr-1">
                <img src="/social/spotify.png" alt="spotify" className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Spotify</div>
                <div className="bold text-md text-center">212.5K</div>
              </div>
            </div>
          </div>
          <div className="flex-none mx-3 text-xs my-auto">
            <div className="flex">
              <div className="my-auto mr-1">
                <img src="/social/twitter.png" alt="twitter" className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Twitter</div>
                <div className="bold text-md text-center">212.5K</div>
              </div>
            </div>
          </div>
          <div className="flex-none mx-3 text-xs my-auto">
            <div className="flex">
              <div className="my-auto mr-1">
                <img src="/social/instagram.png" alt="instagram" className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Instagram</div>
                <div className="bold text-md text-center">212.5K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
