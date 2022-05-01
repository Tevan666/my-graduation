import { Pie } from '@ant-design/plots';
const PieChart = ({ data }) => {
  console.log(data, 'data');
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <>
      <Pie {...config} />
    </>
  );
};

export default PieChart;
