import { Line } from '@ant-design/charts';
import { useState } from 'react';

const Page = (lineData) => {
  console.log(lineData);
  const res = lineData.lineData;
  console.log(res);
  const resList = [];
  res.map((item) => {
    resList.push(item);
  });
  console.log(resList, 'list');
  const data = resList;

  const config = {
    data,
    xField: 'name',
    yField: 'score',
    point: {
      size: 5,
      shape: 'diamond',
    },
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
