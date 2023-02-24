export function createNotDesigned() {
  return function NotDesigned({ name }: { name: string }): JSX.Element {
    return (
      <div className="flex">
        <div className="my-18 h-screen mx-auto text-2xl text-red-500">
          <div className="py-40">
            ☹️
            {' '}
            {name}
            {' '}
            has not been designed yet!
          </div>
        </div>
      </div>
    );
  };
}
