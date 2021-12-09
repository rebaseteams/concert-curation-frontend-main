import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import DownloadAsPdfButton from './pdfCreateButton';

describe('Reusable Buttons', () => {
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

  it('Should render download pdf button icon', () => {
    render(<DownloadAsPdfButton downloadPdf />);
    expect(screen.getByTestId('download-pdf')).toBeInTheDocument();
  });

  it('Should render download pdf tooltip after mouse hover', async () => {
    render(<DownloadAsPdfButton downloadPdf />);
    fireEvent.mouseOver(screen.getByTestId('download-pdf'));
    await waitFor(() => screen.getByText('Download Pdf'));
    expect(screen.getByText('Download Pdf')).toBeInTheDocument();
  });
});
