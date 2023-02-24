import { Link, Outlet, useLocation } from 'react-router-dom';
import './style.scss';

export function createHeader(): () =>JSX.Element {
  const links = [
    { id: 'my-page', name: 'My page', link: '/v2/my-page' },
    { id: 'concerts', name: 'Concerts', link: '/v2/concerts' },
    { id: 'artists', name: 'Artists', link: '/v2/artists/1' },
    { id: 'brands', name: 'Brands', link: '/v2/brands' },
    { id: 'about-us', name: 'About us', link: '/v2/about-us' },
    { id: 'contact', name: 'Contact', link: '/v2/contact' },
  ];

  return function Header(): JSX.Element {
    const location = useLocation();

    return (
      <div className="bg-white">
        <div className="bg-slate-900 px-4 text-white flex">
          <div className="w-10 flex-none"><img alt="cuttime-logo" src="/cuttime.png" /></div>
          <div className="flex-grow mt-auto">
            <div className="flex text-white">
              {
                links.map((nav) => (
                  <Link to={nav.link} className="text-white hover:text-cyan-500">
                    <div className={`${location.pathname.startsWith(nav.link) ? 'text-cyan-500 bold border-b-4 border-cyan-500 ' : ''} mx-4 pb-1 hover:text-cyan-500 hover:border-b-2 hover:border-cyan-500`}>
                      { nav.name }
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
          <div className="flex-none my-auto">
            <div className="flex">
              <div className="text-white mx-2 mt-auto pt-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 my-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <div className="bg-cyan-500 border rounded p-1 mx-2 rounded-full">
                <div className="text-white text-sm">SS</div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
        <div className="bg-slate-900 py-14 px-24">
          <div className="flex">
            <div className="basis-2/3">
              <div className="flex text-white text-xs">
                <div className="flex-grow">
                  <div className="text-gray-500 text-sm">
                    Know about
                  </div>
                  <div className="text-white">
                    <div className="my-2">Artist analytics</div>
                    <div className="my-2">Compare analytics</div>
                    <div className="my-2">Genre analytics</div>
                    <div className="my-2">Brand analytics</div>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-gray-500 text-sm">
                    Plans
                  </div>
                  <div className="text-white">
                    <div className="my-2">Lite</div>
                    <div className="my-2">Premium</div>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-gray-500 text-sm">
                    Resources
                  </div>
                  <div className="text-white">
                    <div className="my-2">Blog</div>
                    <div className="my-2">Help centre</div>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-gray-500 text-sm">
                    Company
                  </div>
                  <div className="text-white">
                    <div className="my-2">About us</div>
                    <div className="my-2">Contact</div>
                    <div className="my-2">Jobs</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/3">
              <div className="text-gray-500 bold">
                FOLLOW US
              </div>
              <div>
                <img src="/icons.png" alt="icons" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
