/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompareData } from '@rebaseitlabs/compare-data';
import * as functionMappper from './functionMapper';

const ArtistGraphs = ({ data, metaData }: any): any => {
  const renderData = new CompareData(functionMappper);
  if (!data) return (<div>No graphs to show</div>);
  if (!metaData) return (<div>No graphs to show</div>);
  return (
    renderData.compare(metaData, data)
  );
};

export default ArtistGraphs;
