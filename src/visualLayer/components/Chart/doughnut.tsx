/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import {
  PieChart, Pie, Tooltip, Label, ResponsiveContainer, Cell,
} from 'recharts';
// STYLES
import './chart.scoped.scss';

/**
 * Wrap it around div with specified width keep min 160px not needed if its within row col
 * Example Data:
 * const data02 = {name:'test',value:60,color:'black'};
 * Usage:
   <ChartComponent type='doughnut' data={data02} />
*/

function CustomTooltip({ payload }: any) {
  if (payload && payload.length > 0 && payload[0].name === 'ignore') {
    return null;
  }
  return <div className="tooltip">{payload[0].name}</div>;
}

interface DoughnutChartProps {
    chartData: any;
    tooltip?: boolean;
    width?: string | number;
    XLables?: Array<string>
}

const DoughnutChart = ({
  chartData,
  tooltip = false,
  width = '100%',
  XLables,
}:DoughnutChartProps) => {
  const [data, setData] = React.useState<Array<any>>([]);
  useEffect(() => {
    setData([chartData, { name: 'ignore', value: 100 - (chartData.value || 0), fill: 'lightgray' }]);
  }, [chartData]);
  return (
    <ResponsiveContainer width={width} aspect={1}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          innerRadius={40}
          outerRadius={80}
          startAngle={-270}
        >
          {chartData.color && <Cell fill={chartData.color} />}
          <Label value={chartData.value || 0} position="center" />
        </Pie>
        {tooltip && <Tooltip content={CustomTooltip} />}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;
