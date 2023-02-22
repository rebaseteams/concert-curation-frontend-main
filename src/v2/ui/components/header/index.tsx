import { Outlet } from 'react-router-dom';
import './style.scss';

export function createHeader(): () =>JSX.Element {
  return function Header(): JSX.Element {
    return (
      <div className="bg-white">
        <div className="bg-slate-800 px-4 py-1 text-white flex">
            <div className="w-10 flex-none"><img alt="cuttime-logo" src='/cuttime.png' /></div>
            <div className='flex-grow mt-auto'>
              <div className='flex text-white'>
                <div className='mx-4 pb-1'>My page</div>
                <div className='text-cyan-500 bold mx-4 pb-1 border-b-2 border-cyan-500'>Concerts</div>
                <div className='mx-4 pb-1'>Artists</div>
                <div className='mx-4 pb-1'>Brands</div>
                <div className='mx-4 pb-1'>Plans</div>
                <div className='mx-4 pb-1'>About us</div>
                <div className='mx-4 pb-1'>Contact</div>
              </div>
            </div>
            <div className='flex-none my-auto'>
              <div className='flex'>
                <div className='text-white mx-2 mt-auto pt-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 my-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <div className='bg-cyan-500 border rounded p-1 mx-2 rounded-full'>
                  <div className="text-white text-sm">SS</div>
                </div>
              </div>
            </div>
        </div>
        <Outlet />
      </div>
    );
  };
}
