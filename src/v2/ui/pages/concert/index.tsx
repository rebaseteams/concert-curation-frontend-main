import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { UseConcerts } from '../../../data/hooks/concert-lists/use-concert-lists';
import { ConcertType } from '../../../model/types/concert';
import { createArtistCard } from '../../components/artist-card';
import { Switch, SwitchMode } from '../../components/library/switch';
import { createArtistGrid } from '../../components/artist-grid';

export function createConcertDetails(): (props: { useConcerts: UseConcerts }) => JSX.Element {
  const Card = createArtistCard();
  const ArtistGrid = createArtistGrid();

  return function ConcertDetails({ useConcerts }: { useConcerts: UseConcerts }): JSX.Element {
    const { id } = useParams();
    const { getSync: getConcert } = useConcerts();
    const [concert, setConcert] = useState<ConcertType>({} as ConcertType);
    const [hidden, setHidden] = useState<boolean>(true);
    const [listMode, setListMode] = useState<SwitchMode>('left');

    function toggle() {
      if (hidden) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    }

    useEffect(() => {
      if (id) {
        getConcert(id).then((r) => setConcert(r));
      }
    }, [id]);

    return (
      <div className="text-black bg-neutral-100">
        <div className="flex py-4 px-4 border-b border-gray-200">
          <div className="flex-none mt-2 mr-3">
            <Link to="/v2/concerts">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
          </div>
          <div className="flex-grow">
            <div className="text-lg bold">{concert.name}</div>
            <div className="text-xs text-gray-500 bold">
              { moment(concert.date).format('ll') }
              { ' | '}
              { concert.type }
            </div>
            <div className="text-black text-xs my-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 inline">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {' '}
              { concert.location }
            </div>
            <div className="flex">
              <div className="my-1">
                <div className="text-gray-700 text-xs bold">Targeted genre</div>
                {
                  concert.genres
                    ? (
                      <div className="my-1">
                        {
                          concert?.genres[0] ? <span className="mx-1 p-1 border-none rounded-full bg-neutral-200">{ concert.genres[0] }</span> : null
                        }
                        {
                          concert?.genres[1] ? <span className="mx-1 p-1 border-none rounded-full bg-neutral-200">{ concert.genres[1] }</span> : null
                        }
                        {
                          concert?.genres[2] ? <span className="mx-1 p-1 border-none rounded-full bg-neutral-200">{ concert.genres[2] }</span> : null
                        }
                        {
                          concert?.genres.length > 3
                            ? (
                              <span className="text-xs bg-gray-800 border-none rounded-full px-1 py-1 text-white">
                                +
                                {concert.genres.length - 3}
                              </span>
                            ) : null
                        }

                      </div>
                    ) : null
                }

                {
                  !hidden ? (
                    <div>
                      <div className="mt-4 text-gray-700 text-xs bold">Brand preferred</div>
                      <div className="text-black text-xs">
                        { concert.targetedGender }
                      </div>
                    </div>
                  ) : null
                }
              </div>
              <div className="my-1 flex-auto">
                <div className="text-gray-700 text-xs bold ml-8">Sponsership type</div>
                <div className="text-black text-xs ml-8">
                  { concert.sponsershipType }
                </div>
                {
                  !hidden ? (
                    <div>
                      <div className="mt-4 text-gray-700 text-xs bold ml-8">Brand not preferred</div>
                      <div className="text-black text-xs ml-8">
                        { concert.targetedGender }
                      </div>
                    </div>
                  ) : null
                }
              </div>
              <div className="my-1 flex-auto">
                <div className="text-gray-700 text-xs bold ml-8">Targeted gender</div>
                <div className="text-black text-xs ml-8">
                  { concert.targetedGender }
                </div>

                {
                  !hidden ? (
                    <div>
                      <div className="mt-4 text-gray-700 text-xs bold ml-8">Targeted age</div>
                      <div className="text-black text-xs ml-8">
                        { concert.targetedGender }
                      </div>
                    </div>
                  ) : null
                }
              </div>
              <div className="my-1 flex-auto">
                <div className="text-gray-700 text-xs bold ml-8">Budget</div>
                {
                  concert.budget
                    ? (
                      <div className="text-black text-xs ml-8">
                        {concert.budget.from}
                        {' '}
                        to
                        {' '}
                        {concert.budget.to}
                      </div>
                    )
                    : null
                }
              </div>
            </div>
          </div>
          <div className="flex-none mx-3 text-xs my-auto text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </div>
          <div className="flex-none mx-3 text-xs my-auto text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
          <div className="flex-none mx-3 my-auto text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
            </svg>
          </div>
          <div className="flex-none mx-3 my-auto text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>

        </div>
        <div className="flex">
          {/* eslint-disable-next-line */}
          <div className="mx-auto cursor relative" onClick={toggle}>
            {
              hidden ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="bg-sky-500 p-1 text-white border-none rounded-full w-6 h-6 absolute -top-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="bg-sky-500 p-1 text-white border-none rounded-full w-6 h-6 absolute -top-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              )
            }
          </div>
        </div>
        <div className="py-4 px-4 bg-white">
          <div className="flex">
            <div className="flex-grow ml-4">
              <div className="text-lg bold">
                Our top 5 recommendation
              </div>
              <div className="text-sm">
                that matches your need
              </div>
            </div>
            <div className="flex-none">
              <Switch toggle={() => setListMode(listMode === 'left' ? 'right' : 'left')} mode={listMode} />
            </div>
          </div>
          <div>
            {
              listMode === 'left' ? (
                <div className="flex flex-wrap">
                  {
                    concert.recommendedArtists?.map((c) => (
                      <div className="basis-1/3 p-2" key={c.id}>
                        <Card card={c} />
                      </div>
                    ))
                  }
                </div>
              )
                : <ArtistGrid list={concert.recommendedArtists} />
            }
          </div>
        </div>
      </div>
    );
  };
}
