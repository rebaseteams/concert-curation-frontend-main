import { screen, render } from '@testing-library/react';
import { TextEncoder } from 'util';
import ConcertsTable from '.';
import { ConcertCreationResponse } from '../../../model/types/questions';

global.TextEncoder = TextEncoder;

const getConcertsMock = (): Promise<void> => new Promise((resolve) => {
  resolve();
});
describe.skip('Concert Table', () => {
  const forms: Array<ConcertCreationResponse> = [
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

  it('should render table heading', () => {
    render(<ConcertsTable concertLoading={false} forms={forms} getConcerts={getConcertsMock} />);
    expect(screen.getByText('Concert Name')).toBeInTheDocument();
  });

  it.skip('should render name of concert', () => {
    render(<ConcertsTable concertLoading={false} forms={forms} getConcerts={getConcertsMock} />);
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  it.skip('should render date of concert', () => {
    render(<ConcertsTable concertLoading={false} forms={forms} getConcerts={getConcertsMock} />);
    expect(screen.getByText('Mon Nov 16-11-2021 23:44:')).toBeInTheDocument();
  });

  it.skip('should render NO Data if forms data is ermpty or not present', () => {
    render(<ConcertsTable concertLoading={false} forms={forms} getConcerts={getConcertsMock} />);
    expect(screen.getByText('No Data')).toBeInTheDocument();
  });
});
