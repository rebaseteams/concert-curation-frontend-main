import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import DashboardComponent from './index';

describe('Dashboard Page', () => {
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
  it('Should render dashboard', async () => {
    render(<DashboardComponent />);
    fireEvent.mouseOver(screen.getByTestId('curate-concert'));
    await waitFor(() => screen.getByText('New Concert'));
    expect(screen.getByText('New Concert')).toBeInTheDocument();
  });

  it('Should render Documents Table', () => {
    render(<DashboardComponent />);
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  it('Should render Concerts List', () => {
    render(<DashboardComponent />);
    expect(screen.getByText('Concert List')).toBeInTheDocument();
  });

  // TODO: complete this test I wast adding this test but was facing some issues
  // it('should popup concert form modal after clicking curate concert button', async () => {
  //   render(<DashboardComponent />);
  //   act(() => {
  //     fireEvent.click(screen.getByTestId('curate-concert'));
  //   });
  //   await waitFor(() => screen.getByText('Choose your prefrences'));
  //   expect(screen.getByText('Choose your prefrences')).toBeInTheDocument();
  // });
});
