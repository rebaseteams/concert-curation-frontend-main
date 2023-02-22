import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { UseConcerts } from '../../../data/hooks/concert-lists/use-concert-lists';
import { createConcertCard } from '../../components/concert-card';
import { Switch, SwitchMode } from '../../components/library/switch';

export function createConcertList(): (props: { useConcerts: UseConcerts }) => JSX.Element {
  const Card = createConcertCard();
  return function ConcertList({ useConcerts }: { useConcerts: UseConcerts }): JSX.Element {
    const { data: concerts, getAll: getAllConcerts, setSync: setConcert } = useConcerts();
    const [listMode, setListMode] = useState<SwitchMode>('left');

    useEffect(() => {
      getAllConcerts();
    }, []);

    async function addConcert() {
      await setConcert({
        id: uuid(),
        name: 'Testing Concert curation',
        date: moment().utc().format(),
        type: 'Musical Festival',
        location: 'Fine Line, Minneapolis',
        budget: {
          from: '$20,000',
          to: '$50,000',
        },
        genres: ['Electropop', 'Electronica', 'Electro house', 'some more', 'some more crap'],
        sponsershipType: 'Customer engagement',
        targetedGender: 'All genders',
        targetedAge: ['18 - 25', '26 - 35'],
        preferredBrands: ['Adidas', 'American Idol'],
        notPreferredBrands: ['Walmart'],
        recommendedArtists: [
          {
            id: '1',
            name: 'Megadeth',
            url: '/artist/1.png',
            matchItems: ['Electropop', 'Electro house', 'Folk', '35% (18-25)', '38% (26-35)', 'Adidas', 'American Idol'],
            matchPercent: 56,
          },
          {
            id: '2',
            name: 'Bob Dylan',
            url: '/artist/2.png',
            matchItems: ['Electropop', 'Electro house', 'Folk', 'Classic', '38% (26-35)', 'Adidas', 'American Idol'],
            matchPercent: 48,
          },
          {
            id: '3',
            name: 'Bruce Springster',
            url: '/artist/3.png',
            matchItems: ['Electropop', 'Electro house', 'Folk', 'Classic', 'Adidas', 'American Idol'],
            matchPercent: 40,
          },
          {
            id: '4',
            name: 'David Grey',
            url: '/artist/4.png',
            matchItems: ['Electropop', 'Classic', '35% (18-25)', '38% (26-35)', 'Adidas', 'American Idol'],
            matchPercent: 38,
          },
          {
            id: '5',
            name: 'Surma Metal Storm',
            url: '/artist/5.png',
            matchItems: ['Electropop', '35% (18-25)', '38% (26-35)', 'Adidas', 'American Idol'],
            matchPercent: 38,
          },
        ],
      });
    }

    return (
      <div className="text-black bg-neutral-100">
        <div className="flex py-4 px-4">
          <div className="flex-grow">
            <div className="text-2xl">Concerts</div>
            <div className="text-xs">
              {concerts?.length || 0}
              {' '}
              concerts available
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
            <Switch toggle={() => setListMode(listMode === 'left' ? 'right' : 'left')} mode={listMode} />
          </div>
          <div className="flex-none mx-3">
            <div className="bg-white text-black text-md bold border border-black rounded-xl p-1">+ Add Concert</div>
          </div>

        </div>
        <div className="py-4 px-4">
          {
            !concerts || concerts.length === 0 ? (
              <div id="no-concerts-available" className="flex flex-col my-8">
                <div className="mx-auto text-center">
                  <div className="text-md bold">No concerts available</div>
                  <div className="text-xs">Its time to create your concert now</div>
                  <button type="button" className="bg-sky-500 border rounded-full p-2 text-white my-2" onClick={addConcert}>+ Add Concert</button>
                </div>
                <div className="mx-auto">
                  <img src="/concert-list-bg.png" alt="concert-list" />
                </div>
              </div>
            )
            // eslint-disable-next-line
              :
              (
                <div>
                  {
                    listMode === 'left' ? (
                      <div className="flex flex-wrap">
                        {
                          concerts?.map((c) => (
                            <div className="basis-1/3 p-2" key={c.id}>
                              <Link to={`/v2/concerts/${c.id}`}>
                                <Card card={c} />
                              </Link>
                            </div>
                          ))
                        }
                      </div>
                    )
                      : (
                        <div className="flex">
                          <div className="my-18 mx-auto text-2xl text-red-500">
                            List View for Concerts has not been designed yet!
                          </div>
                        </div>
                      )
                  }
                </div>
              )
          }
        </div>
      </div>
    );
  };
}
