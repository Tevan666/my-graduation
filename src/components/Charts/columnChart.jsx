import { Column } from '@ant-design/plots';

const ColumnChart = ({ data, type }) => {
  const alias = type === 'center' ? ['时间', '次数'] : ['类别', '相似率'];
  const field = type === 'center' ? ['type', 'value'] : ['name', 'score'];
  if (type === 'function') {
    data.forEach((item) => {
      item.score = parseFloat(((item.score * 100) / 100).toFixed(4));
    });
  }
  const config = {
    height: 200,
    data,
    xField: field[0],
    yField: field[1],
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: alias[0] || '类型',
      },
      value: {
        alias: alias[1] || '值',
      },
    },
  };

  return (
    <>
      <Column {...config} />
    </>
  );
};

export default ColumnChart;
