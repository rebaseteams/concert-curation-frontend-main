import { CompareData } from '@rebaseitlabs/compare-data';
import { sampledata } from './testData';
import { metadata } from './testMetaData';

const createArtistPage = ({
  compareService,
}: {compareService: CompareData}):
  () => JSX.Element => {
  const ComparePage = (): JSX.Element => (
    compareService.compare(metadata, sampledata)
  );

  return ComparePage;
};

export default createArtistPage;
