import { fireEvent, render, screen } from '@testing-library/react';
import AdvancedSearch from '.';

describe('AdvancedSearch', () => {
  it('Should render AdvancedSearch component', () => {
    render(<AdvancedSearch filterOptions={[]} />);
    expect(screen.getByText('Search in Concert Curation')).toBeInTheDocument();
  });

  it.skip('Should change border color on hover', () => {
    render(<AdvancedSearch filterOptions={[]} />);
    fireEvent.mouseUp(screen.getByTestId('search-button'));
    // to figure which property changes border color in antd
    expect(screen.getByTestId('search-button')).toHaveStyle('border: red');
  });

  it('Should open search popup', () => {
    render(<AdvancedSearch filterOptions={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    expect(screen.getByTestId('search-popup-modal')).toBeInTheDocument();
  });
});
