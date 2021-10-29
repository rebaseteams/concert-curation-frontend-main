/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubmittedCard from './index';

describe('Submitted Form Card Component', () => {
  const formData = {
    id: 'form101',
    dateCreated: '2021-10-30',
    concertName: 'Friday Night Rock',
    status: 'pending',
  };
  test('should render Submitted Card component', () => {
    render(<Router><SubmittedCard form={formData} /></Router>);
    expect(screen.getByText('Friday Night Rock')).toBeInTheDocument();
  });
});
