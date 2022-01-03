import { Line, Gauge } from '@ant-design/charts';
import React, { useRef, useEffect } from 'react';

const Page = (lineData) => {
  const res = lineData.lineData;
  const ticks = [0, 1 / 3, 2 / 3, 1];
  const color = ['#F4664A', '#FAAD14', '#30BF78'];
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

  const RaugeConfig = {
    percent: resList[0].score,
    range: {
      ticks: [0, 1],
      color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      title: {
        formatter: ({ percent }) => {
          return `识别结果:${percent.toFixed(2)}`;
        },
        style: ({ percent }) => {
          return {
            fontSize: '36px',
            lineHeight: 1,
            color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
          };
        },
      },
      content: {
        offsetY: 36,
        style: {
          fontSize: '24px',
          color: '#4B535E',
        },
        formatter: () => `预测结果:${resList[0].name}`,
      },
    },
  };
  return (
    <>
      <Gauge {...RaugeConfig} />
      <Line {...config} />
    </>
  );
};
export default Page;
