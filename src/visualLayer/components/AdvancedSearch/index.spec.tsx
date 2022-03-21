import {
  fireEvent, render, screen,
} from '@testing-library/react';
import AdvancedSearch from '.';

describe('AdvancedSearch', () => {
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
  it('Should render AdvancedSearch component', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    expect(screen.getByText('Search in Concert Curation')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon-in-search-button')).toBeInTheDocument();
  });

  it.skip('Should change border color on hover', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.mouseUp(screen.getByTestId('search-button'));
    // to figure which property changes border color in antd
    expect(screen.getByTestId('search-button')).toHaveStyle('border: red');
  });

  it('Should open search popup', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    expect(screen.getByTestId('search-popup-modal')).toBeInTheDocument();
  });

  it('Should close search popup when close icon is clicked', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.click(screen.getByTestId('top-right-close-icon'));
    setTimeout(() => {
      expect(screen.queryByTestId('search-popup-modal')).not.toBeInTheDocument();
    }, 10);
  });

  it('should have all required componnts', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    expect(screen.getByTestId('top-right-close-icon')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon-near-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-query-input')).toBeInTheDocument();
  });

  it('should show crear button when query is typed', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: 'a' } });
    expect(screen.getByTestId('clear-button-near-input')).toBeInTheDocument();
  });

  it('should show types query as in result', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: 'abc' } });
    expect(screen.getByText('abc')).toBeInTheDocument();
  });

  it('should add a tag when option selected selected', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('abc'));
    expect(screen.getByTestId('selected-tags-near-input')).toBeInTheDocument();
  });

  it('should remove tad when clickes close icon on tag', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('abc'));
    fireEvent.click(screen.getByTestId('selected-tags-close-icon-near-input'));
    expect(screen.queryByTestId('selected-tags-near-input')).not.toBeInTheDocument();
  });

  it('should remove search icon when tag is selected', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('abc'));
    expect(screen.queryByTestId('search-icon-near-input')).not.toBeInTheDocument();
  });

  it('should clear query when clear button is clicked', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByTestId('clear-button-near-input'));
    expect(screen.queryByText('abc')).not.toBeInTheDocument();
  });

  it('should not show clear button when query string is removed', () => {
    render(<AdvancedSearch filterOptions={[]} searchResults={[]} />);
    fireEvent.click(screen.getByTestId('search-button'));
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: 'abc' } });
    fireEvent.change(screen.getByTestId('search-query-input'), { target: { value: '' } });
    expect(screen.queryByTestId('clear-button-near-input')).not.toBeInTheDocument();
  });
});
