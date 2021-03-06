import * as _ from 'lodash';

interface ArtistsSummaryProp {
  summary: string;
   artistName: string
}

const ArtistsSummary = ({ summary, artistName }: ArtistsSummaryProp): JSX.Element => (
  <div className="summary" key={artistName}>
    <h4>{_.upperFirst(artistName)}</h4>
    <p>{_.upperFirst(summary)}</p>
  </div>
);

export default ArtistsSummary;
