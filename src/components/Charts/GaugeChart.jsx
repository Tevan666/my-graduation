import { Gauge } from '@ant-design/charts';

const GaugeChart = (lineData) => {
  const res = lineData.lineData;
  const ticks = [0, 1 / 3, 2 / 3, 1];
  const color = ['#F4664A', '#FAAD14', '#30BF78'];
  const resList = [];
  res.map((item) => {
    item.score = (item.score * 100) / 100;
    resList.push(item);
  });

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
  return <Gauge {...RaugeConfig} />;
};

export default GaugeChart;
