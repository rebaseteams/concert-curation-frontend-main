/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmittedCard from './index';

describe('Submitted Form Card Component', () => {
  const formData = {
    id: '63878378973',
    form_name: 'Friday Night Rock',
    event_type: 'Colleges and Universities',
    venue: ['London', 'Mumbai'],
    artist_budget: { min: 20000, max: 50000 },
    sponsorship_type: 'Direct sales',
    wanted_brands: ['Limca'],
    unwanted_brands: ['Mirenda', 'Pepsi'],
    target_audience: {
      age_group: ['26-35', '36-60'],
      gender: ['female', 'both'],
      genre: ['DJ', 'Classic'],
    },
  };
  test('should render Submitted Card component', () => {
    render(<SubmittedCard form={formData} />);
    expect(screen.getByText('Friday Night Rock')).toBeInTheDocument();
  });
});
