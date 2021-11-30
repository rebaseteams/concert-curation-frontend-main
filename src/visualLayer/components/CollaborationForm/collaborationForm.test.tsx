import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import CollaborationFrom from './collaborationForm';

describe('Collaboration Form', () => {
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
  it('Should render the templates name', () => {
    render(<CollaborationFrom />);
    expect(screen.getByText('Select template')).toBeInTheDocument();
  });
});
