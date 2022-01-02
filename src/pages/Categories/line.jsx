import { Line } from '@ant-design/charts';

const Page = (lineData) => {
  const res = lineData.lineData;
  const resList = [];
  res.map((item) => {
    item.score = (item.score * 100) / 100;
    resList.push(item);
  });
  const data = res;

  const config = {
    data,
    xField: 'name',
    yField: 'score',
    yAxis: {
      title: {
        text: '分类结果',
        position: 'end',
      },
      label: {
        formatter: (value) => (value * 100) / 100,
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
    },
    appendPadding: [16, 8, 16, 8],
    lineStyle: {
      stroke: 'black',
      lineWidth: 2,
      lineDash: [4, 5],
      strokeOpacity: 0.7,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
    },
  };
  return <Line {...config} />;
};
export default Page;
