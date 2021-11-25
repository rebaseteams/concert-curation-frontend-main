import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ConcertsTable from '.';
import { ConcertsListData } from '../../interfaces/concertForm';

describe('Concert Table', () => {
  const forms: Array<ConcertsListData> = [
    {
      id: '97833-90',
      concertName: 'Facebook',
      dateCreated: 'Mon Nov 16-11-2021 23:44:23',
      status: true,
    },
    {
      id: '97834-90',
      concertName: 'Google',
      dateCreated: 'Fri Nov 14-11-2021',
      status: true,
    },
  ];

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it('should render table heading', () => {
    render(<Router><ConcertsTable forms={forms} getConcerts /></Router>);
    expect(screen.getByText('Concert Name')).toBeInTheDocument();
  });

  it('should render name of concert', () => {
    render(<Router><ConcertsTable forms={forms} getConcerts /></Router>);
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  it('should render date of concert', () => {
    render(<Router><ConcertsTable forms={forms} getConcerts /></Router>);
    expect(screen.getByText('Mon Nov 16-11-2021 23:44:')).toBeInTheDocument();
  });

  it('should render NO Data if forms data is ermpty or not present', () => {
    render(<Router><ConcertsTable forms={[]} getConcerts /></Router>);
    expect(screen.getByText('No Data')).toBeInTheDocument();
  });
});