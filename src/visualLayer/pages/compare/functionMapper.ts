/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { chartObj as cotype } from '../../../model/types/comparePage';

interface StackBarChartData {
  xAxisData: Array<string>;
  yAxisData:
    | Array<{
        name: string;
        data: Array<{
          xData: string;
          yData: number | string;
        }>;
      }>
    | any;
}

export interface StackBarInterface {
  data?: StackBarChartData;
  layout?: unknown;
  background?: unknown;
  chartheading?: string | Array<string>;
}

const mapper = {
  a18_29: '18-29',
  a30_44: '30-44',
  a45_60: '45-60',
  a60_plus: '60+',
  k_25_50: '25-50k',
  k_50_100: '50-100k',
  k_100_150: '100-150k',
  k_150_plus: '150k Plus',
  k_under_25: 'Under 25k',
  male: 'Male',
  female: 'Female',
  bachelor_degree: 'Bachelor',
  graduate_degree: 'Graduation',
  high_school_degree: 'High School',
  less_than_high_school_degree: 'Less than high school',
  some_college_or_associate_degree: 'Some College/ Assosciate',
};

// ---Functions for data mapping of Demographic data---
// Stack Bar Chart Mapper starts
export const DemographicsStackAgeGetter = (chartObj: cotype, data: any) => demographicsStackGetter(data, chartObj, 'age');

function demographicsStackGetter(data: any, chartObj: cotype, prop: string) {
  const result: StackBarChartData = {
    xAxisData: [],
    yAxisData: [],
  };
  let mapperObj: any;
  data.forEach((artist: any) => {
    if (artist.demographics[prop]) {
      mapperObj = artist;
      return false;
    }
    return null;
  });
  if (!mapperObj) {
    return [{ data: result, width: 8, aspect: 4 / data.length }];
  }
  _.map(mapperObj.demographics[prop], (propValue, propKey) => {
    const res: {
      name:string;
      data: Array<{
        xData:string;
        yData:string;
      }>
    } = {
      name: '',
      data: [],
    };
    const mapperValue = mapper[propKey as keyof typeof mapper] || propKey;
    res.name = mapperValue;

    data.forEach((artists: any) => {
      if (!result.xAxisData.includes(artists.name)) {
        result.xAxisData.push(artists.name);
      }
      if (
        artists.demographics[prop] && artists.demographics[prop][propKey]
      ) {
        res.data.push({
          xData: artists.name,
          yData: artists.demographics[prop][propKey],
        });
      }
    });
    result.yAxisData.push(res);
  });
  return [{ data: result, width: 8, aspect: 4 / data.length }];
}

// Stack bar chart mapper ends
