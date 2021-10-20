// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from 'react';
// import './charts.scss';
// import ApexCharts from 'react-apexcharts';

// interface Legend {
//   show?: boolean
//   showForSingleSeries?: boolean
//   showForNullSeries?: boolean
//   showForZeroSeries?: boolean
//   floating?: boolean
//   inverseOrder?: boolean
//   position?: 'top' | 'right' | 'bottom' | 'left'
//   horizontalAlign?: 'left' | 'center' | 'right'
//   fontSize?: string
//   fontFamily?: string
//   fontWeight?: string | number
//   width?: number
//   height?: number
//   offsetX?: number
//   offsetY?: number
//   formatter?(legendName: string, opts?: any): string
//   tooltipHoverFormatter?(legendName: string, opts?: any): string
//   textAnchor?: string
//   customLegendItems?: string[]
//   labels?: {
//     colors?: string | string[]
//     useSeriesColors?: boolean
//   }
//   markers?: {
//     width?: number
//     height?: number
//     strokeColor?: string
//     strokeWidth?: number
//     fillColors?: string[]
//     offsetX?: number
//     offsetY?: number
//     radius?: number
//     customHTML?(): any
//     onClick?(): void
//   }
//   itemMargin?: {
//     horizontal?: number
//     vertical?: number
//   }
//   containerMargin?: {
//     left?: number
//     top?: number
//   }
//   onItemClick?: {
//     toggleDataSeries?: boolean
//   }
//   onItemHover?: {
//     highlightDataSeries?: boolean
//   }
// }

// const myDummyData = {
//   label: ['Artist1', 'Aryist2', 'Aryist3', 'Aryist4', 'Aryist5'],
//   value: [30, 40, 45, 50, 49],
// };

// interface PieData {
//     data: {
//         label: Array<string> | Array<number>;
//         value: Array<string> | Array<number>;
//     }
// }

// const PieChart = ({ data = myDummyData }: PieData) => {
//   const [label, setLabel] = useState(Array<any>());
//   const [value, setValue] = useState(Array<any>());

//   useEffect(() => {
//     setLabel(data.label);
//     setValue(data.value);
//   });

//   const legend: Legend = {
//     show: true,
//     showForSingleSeries: false,
//     showForNullSeries: true,
//     showForZeroSeries: true,
//     position: 'bottom',
//     horizontalAlign: 'center',
//   };

//   const options = {
//     labels: label,
//     legend,
//     chart: {
//       events: {
//         dataPointSelection(event: any, chartContext: any, config: any) {
//           config.dataPointIndex;
//         },
//       },
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '40%',
//         },
//         labels: {
//           show: true,
//           name: {
//           },
//           value: {
//           },
//         },
//       },
//     },
//   };

//   const series = value;

//   return (
//     <div className="chart-container">
//       <h2 className="chart-heading">Pie Chart </h2>
//       <div className="chart">
//         <div className="bubble">
//           hello
//         </div>
//         <ApexCharts
//           options={options}
//           series={series}
//           width="100%"
//           type="donut"
//         />
//       </div>
//     </div>
//   );
// };

// export default PieChart;
