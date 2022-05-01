import { Bar } from '@ant-design/plots';

const HorizontalBarChart = ({ data }) => {
  const config = {
    data,
    xField: 'value',
    yField: 'username',
    legend: {
      position: 'top-left',
    },
    color: {
      color: ['#d62728', '#2ca02c'],
    },
  };
  return <>{data && <Bar {...config} />}</>;
};

export default HorizontalBarChart;
