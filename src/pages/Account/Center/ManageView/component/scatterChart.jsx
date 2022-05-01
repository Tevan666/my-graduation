import { Scatter } from '@ant-design/plots';

const ScatterChart = ({ data }) => {
  const total = [
    { time: '2021-01', value: 0 },
    { time: '2021-02', value: 0 },
    { time: '2021-03', value: 0 },
    { time: '2021-04', value: 0 },
    { time: '2021-05', value: 0 },
    { time: '2021-06', value: 0 },
    { time: '2021-07', value: 0 },
    { time: '2021-08', value: 0 },
    { time: '2021-09', value: 0 },
    { time: '2021-10', value: 0 },
    { time: '2021-11', value: 0 },
    { time: '2021-12', value: 0 },
    { time: '2022-01', value: 0 },
    { time: '2022-02', value: 0 },
    { time: '2022-03', value: 0 },
    { time: '2022-04', value: 0 },
    { time: '2022-05', value: 0 },
    { time: '2022-06', value: 0 },
    { time: '2022-07', value: 0 },
    { time: '2022-08', value: 0 },
    { time: '2022-09', value: 0 },
    { time: '2022-10', value: 0 },
    { time: '2022-11', value: 0 },
    { time: '2022-12', value: 0 },
  ];
  data.map((dataItem) => {
    total.forEach((item) => {
      if (item.time === dataItem.time) {
        item.value = dataItem.value;
      }
    });
  });
  const config = {
    data: total,
    height: 200,
    xField: 'time',
    yField: 'value',
    size: 5,
    pointStyle: {
      stroke: '#777777',
      lineWidth: 1,
      fill: '#5B8FF9',
    },
    regressionLine: {
      type: 'quad', // linear, exp, loess, log, poly, pow, quad
    },
  };

  return (
    <>
      <Scatter {...config} />
    </>
  );
};

export default ScatterChart;
