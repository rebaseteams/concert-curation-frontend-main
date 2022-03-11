import { render, screen } from '@testing-library/react';
import AdvancedSearch from '.';

describe('AdvancedSearch', () => {
  it('Should render AdvancedSearch component', () => {
    render(<AdvancedSearch filterOptions={[]} />);
    expect(screen.getByText('Search in Concert Curation')).toBeInTheDocument();
  });
});
