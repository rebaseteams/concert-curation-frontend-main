import React from 'react';
import moment from 'moment';

import { ConcertType } from '../../../model/types/concert';

export function createConcertCard(): ({ card }: { card: ConcertType }) => JSX.Element {
  return function ConcertCard({ card }: { card: ConcertType }): JSX.Element {
    return (
      <div className="bg-white hover:bg-slate-100 border border-gray-200 rounded-xl p-2 m-2">
        <div className="my-1">
          <span className="text-gray-700 text-xs bold">{ moment(card.date).format('ll')}</span>
          {' '}
          |
          {' '}
          <span className="text-gray-700 text-xs bold">{ card.type }</span>
        </div>
        <div className="text-lg text-black bold my-1">
          { card.name }
        </div>
        <div className="text-black text-xs px-1 my-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 inline">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {' '}
          { card.location }
        </div>
        <div className="my-1">
          <div className="text-gray-700 text-xs bold">Budget</div>
          <div className="text-sm text-black">
            {card.budget.from}
            {' '}
            to
            {' '}
            {card.budget.to}
          </div>
        </div>
        <div className="my-1">
          <div className="text-gray-700 text-xs bold">Targeted genre</div>
          <div className="my-1">
            {
              card.genres[0] ? <span className="mx-1 p-1 border-none rounded-full bg-neutral-200">{ card.genres[0] }</span> : null
            }
            {
              card.genres[1] ? <span className="mx-1 p-1 border-none rounded-full bg-neutral-200">{ card.genres[1] }</span> : null
            }
            {
              card.genres[2] ? <span className="mx-1 p-1 border-none rounded-full bg-neutral-200">{ card.genres[2] }</span> : null
            }
            {
              card.genres.length > 3
                ? (
                  <span className="text-xs bg-gray-800 border-none rounded-full px-2 py-2 text-white">
                    +
                    {card.genres.length - 3}
                  </span>
                ) : null
            }

          </div>
        </div>

      </div>
    );
  };
}
