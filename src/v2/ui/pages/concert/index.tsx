import { useEffect, useState } from 'react';
// import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { UseConcerts } from '../../../data/hooks/concert-lists/use-concert-lists';
import { ConcertType } from '../../../model/types/concert';
import { createConcertCard } from '../../components/concert-card';

export function createConcertDetails(): (props: { useConcerts: UseConcerts }) => JSX.Element {
  const Card = createConcertCard();
  return function ConcertDetails({ useConcerts }: { useConcerts: UseConcerts }): JSX.Element {
    const { id } = useParams();
    const { data: concerts, getSync: getConcert } = useConcerts();
    const [concert, setConcert] = useState<ConcertType>({} as ConcertType);
    const [hidden, setHidden] = useState<boolean>(false);

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
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
          <div className="flex-none mx-3 text-xs my-auto">
            <div className="my-auto">
              Sort by
            </div>
          </div>
          <div className="flex-none mx-3 text-xs my-auto">
            Latest ▼
          </div>
          <div className="flex-none mx-3 my-auto">
            <div className="flex">
              <div className="text-white bg-black px-2 py-1 border border-black rounded-l-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <div className="bg-white text-black px-2 py-1 border border-black rounded-r-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-none mx-3">
            <div className="bg-white text-black text-md bold border border-black rounded-xl p-1">+ Add Concert</div>
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
          {
            !concerts || concerts.length === 0 ? (
              <div id="no-concerts-available" className="flex flex-col my-8">
                <div className="mx-auto text-center">
                  <div className="text-md bold">No concerts available</div>
                  <div className="text-xs">Its time to create your concert now</div>
                  <button type="button" className="bg-sky-500 border rounded-full p-2 text-white my-2">+ Add Concert</button>
                </div>
                <div className="mx-auto">
                  <img src="/concert-list-bg.png" alt="concert-list" />
                </div>
              </div>
            )
            // eslint-disable-next-line
              :
              (
                <div className="flex flex-wrap">
                  {
                    concerts?.map((c) => (
                      <div className="basis-1/3 p-2" key={c.id}>
                        <Card card={c} />
                      </div>
                    ))
                  }
                </div>
              )
          }
        </div>
      </div>
    );
  };
}
