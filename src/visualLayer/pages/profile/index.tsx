/* eslint-disable arrow-body-style */

import './index.scss';

const createProfilePage = () => {
  return function ProfilePage(): JSX.Element {
    return (
      <div className="container">
        <div>
          <h3>profile Page</h3>
        </div>
      </div>
    );
  };
};

export default createProfilePage;
