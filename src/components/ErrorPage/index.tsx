import React from 'react';

import './errorPage.scss';

interface ErrorPageProp {
  error: {
    status: number | string;
    message: string;
  }
}

const ErrorPage = ({ error }: ErrorPageProp): JSX.Element => (
  <div className="errorPage">
    <h1>
      { `${error.status} :(` }
    </h1>
    <p>
      { error.message }
    </p>
  </div>
);

export default ErrorPage;
