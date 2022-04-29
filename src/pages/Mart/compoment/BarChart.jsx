import { Spin } from 'antd';
import { Line } from '@ant-design/plots';

const BarChart = ({ data }) => {
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
  ];
  console.log(totaldata, 'total');

  const totaldata = total.concat(data).sort();
  console.log(totaldata, 'next');
  const config = {
    data: totaldata,
    xField: 'time',
    yField: 'value',
    padding: 'auto',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };
  return <>{data.length ? <Line {...config} /> : <Spin />}</>;
};

export default BarChart;
