import { CompareData } from '@rebaseitlabs/compare-data';
import { sampledata } from './testData';
import { metadata } from './testMetaData';

const createCompareComponent = ():
    () => JSX.Element => {
  const ComparePage = (): JSX.Element => (
    <div>
      <CompareData
        metaData={metadata}
        data={sampledata}
      />
    </div>
  );

  return ComparePage;
};

export default createCompareComponent;
