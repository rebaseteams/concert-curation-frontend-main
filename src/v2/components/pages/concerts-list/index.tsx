

export function createConcertList(): () => JSX.Element {
  return function ConcertList(): JSX.Element {
    return <div className="text-black">
      <div className="flex py-4 px-4">
        <div className="flex-grow">
          <div className="text-2xl">Concerts</div>
          <div className="text-xs">0 concerts available</div>
        </div>
        <div className="flex-none mx-3 text-xs my-auto">
          <div className="my-auto">
            Sort by
          </div>
        </div>
        <div className="flex-none mx-3 text-xs my-auto">
          Latest ▼
        </div>
        <div className='flex-none mx-3 my-auto'>
          <div className="flex">
            <div className="text-white bg-black px-2 py-1 border border-black rounded-l-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              </div>
            <div className="bg-white text-black px-2 py-1 border border-black rounded-r-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex-none mx-3">
          <div className="bg-white text-black text-md bold border border-black rounded-xl p-1">+ Add Concert</div>
        </div>

      </div>
    </div>
  }
}