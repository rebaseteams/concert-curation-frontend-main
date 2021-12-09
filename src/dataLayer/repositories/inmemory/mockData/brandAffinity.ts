import _ from 'lodash';
import { LineChartModal } from '../../../../visualLayer/components/Chart/lineChart';

const brand1Data: Array<{xAxis: string; yAxis: number }> = [];
const brand2Data: Array<{xAxis: string; yAxis: number }> = [];
const xAxisData: Array<string> = [];

_.times(20, (index: number) => {
  brand1Data.push({
    xAxis: String(100 + index),
    yAxis: Math.random() % 2000,
  });
});

_.times(20, (brand2: number) => {
  brand2Data.push({
    xAxis: String(100 + brand2),
    yAxis: Math.random() % 200,
  });
});

_.times(20, (index: number) => {
  xAxisData.push(String(100 + index));
});

const brandAffinity: LineChartModal = {
  xAxisData,
  yAxisData: [
    {
      name: 'Brand1',
      data: brand1Data,
    },
    {
      name: 'Brand2',
      data: brand2Data,
    },
  ],
};

export default brandAffinity;
