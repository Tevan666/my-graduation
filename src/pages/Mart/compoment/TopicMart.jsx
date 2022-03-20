import { useState } from 'react';

import RcResizeObserver from 'rc-resize-observer';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { Button, Statistic, Popconfirm, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { animalState } from '../index';
import { useRecoilState } from 'recoil';

const handleCancel = () => {
  message.error('呵呵');
};

const TopicMart = (params) => {
  const [responsive, setResponsive] = useState(false);
  const [animalInfo, setAnimalInfo] = useRecoilState(animalState);

  const [time, setTime] = useState(moment().format('YYYY-MM-DD, h:mm:ss a'));
  setInterval(() => {
    setTime(moment().format('YYYY-MM-DD, h:mm:ss a'));
  }, 1000);

  const handleConfirm = () => {
    setAnimalInfo({
      ...animalInfo,
      amount: 1,
    });
    message.success('不给');
    console.log(animalInfo, 'info222');
  };
  return (
    <>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          title="数据概览"
          extra={`${time}`}
          split={responsive ? 'horizontal' : 'vertical'}
          headerBordered
          bordered
        >
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: '昨日购买量',
                    value: 234,
                    description: <Statistic title="较本月平均购买量" value="8.04%" trend="down" />,
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: '本月累计购买量',
                    value: 234,
                    description: <Statistic title="月同比" value="8.04%" trend="up" />,
                  }}
                />
              </ProCard>
              <ProCard split="vertical">
                <StatisticCard
                  title={
                    <Popconfirm
                      title="限时免费领取啦 先到先得！！！"
                      onConfirm={handleConfirm}
                      onCancel={handleCancel}
                      okText="炫就完事了"
                      cancelText="算了我不要了"
                    >
                      <Button size="large" type="dashed" className="flex align-middle">
                        限时免费领取
                        <PlusCircleOutlined />
                      </Button>
                    </Popconfirm>
                  }
                />
                <StatisticCard
                  statistic={{
                    title: '历史购买总数',
                    value: '134',
                    suffix: '个',
                  }}
                />
              </ProCard>
            </ProCard>
            <StatisticCard
              title="数量走势"
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                  width="100%"
                />
              }
            />
          </ProCard>
          <StatisticCard
            title="使用时间分布"
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                alt="大盘"
                width="100%"
              />
            }
          />
        </ProCard>
      </RcResizeObserver>
    </>
  );
};

export default TopicMart;
