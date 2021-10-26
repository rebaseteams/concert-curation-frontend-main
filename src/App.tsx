/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './App.scss';
import LayoutComponent from './layout';

function App():JSX.Element {
  return (
    <div className="app-container">
      <LayoutComponent />
    </div>
  );
}

export default App;
