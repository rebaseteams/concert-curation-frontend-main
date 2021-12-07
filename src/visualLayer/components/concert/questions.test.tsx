/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionsForm from './index';

describe.skip('Questions Component', () => {
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
  test('should render Questions component', () => {
    render(<QuestionsForm setVisible setForms />);
    expect(screen.getByText('Which type of event is it?')).toBeInTheDocument();
  });
  test('should render budget field', () => {
    render(<QuestionsForm setVisible setForms />);
    expect(screen.getByText('Set budget')).toBeInTheDocument();
  });
});
