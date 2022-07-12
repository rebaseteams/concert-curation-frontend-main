/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { chartObj as cotype } from '../../../../model/types/comparePage';

const mapper = {
  bachelor_degree: 'Bachelor',
  graduate_degree: 'Graduation',
  high_school_degree: 'High School',
  less_than_high_school_degree: 'Less than high school',
  some_college_or_associate_degree: 'Some College/ Assosciate',
};

// ---Functions for line graph data mapping---

export const SpotifyLineGraphGetter = (
  chartObj: cotype, data: Record<string, unknown>,
): any => lineGraphGetter(data, 'spotify');

export const TwitterLineGraphGetter = (
  chartObj: cotype, data: Record<string, unknown>,
): any => lineGraphGetter(data, 'twitter');
// ---Functions for line graph data mapping---

export const EducationPieChartGetter = (
  chartObj: cotype, data: Record<string, unknown>,
): any => pieChartGetter(data, chartObj, 'education');

// ---Generic functions---

function lineGraphGetter(data: any, name: string) {
  const result:{
    xAxisData: Array<any>;
    yAxisData: Array<any>;
  } = {
    xAxisData: [],
    yAxisData: [],
  };

  result.yAxisData.push({ name, data: [] });

  _.map(data.lineGraphData[name], (obj: any) => {
    result.xAxisData.push(obj.xAxis);

    result.yAxisData[0].data.push({
      xAxis: obj.xAxis,
      yAxis: obj.yAxis,
    });
  });

  result.xAxisData.sort();

  return [{ data: result, width: 12, aspect: 1.5 }];
}

function pieChartGetter(data: any, chartObj: cotype, prop: string) {
  const finalResult = {
    data: {
      headerName: prop,
      name: chartObj.name,
      data: _.map(data.pieChartData[prop], (value, key) => {
        const label = mapper[key as keyof typeof mapper] || key;
        return { label, value: Number(value) };
      }),
    },
    width: data.length > 1 ? Number(24 / data.length) : 12,
    offset: data.length > 1 ? 0 : 6,
    aspect: 1.5,
  };

  return [finalResult];
}
