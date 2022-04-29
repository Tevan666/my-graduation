import { useState } from 'react';

import RcResizeObserver from 'rc-resize-observer';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { Button, Popconfirm, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { animalState } from '../index';
import { useRecoilState } from 'recoil';
const { Statistic } = StatisticCard;
const handleCancel = () => {
  message.error('呵呵');
};

const TopicMart = (params) => {
  const [responsive, setResponsive] = useState(false);
  const [animalInfo, setAnimalInfo] = useRecoilState(animalState);
  const purchaseData =
    params.type === 'animal'
      ? params.purchaseData.filter((data) => data.goods_id === 'gd001')
      : params.purchaseData.filter((data) => data.goods_id === 'gd002');
  const uploadData =
    params.type === 'animal'
      ? params.uploadData.filter((data) => data.type === 'animal')
      : params.uploadData.filter((data) => data.type === 'plant');
  const thisMonthData = purchaseData.filter((item) => {
    return moment(item.purchase_time) > moment().subtract(1, 'months').startOf('month');
  }).length;
  const lastMonthData = purchaseData.filter((item) => {
    return (
      moment(item.purchase_time) < moment().startOf('month') &&
      moment(item.purchase_time) > moment().subtract(2, 'months').endOf('month')
    );
  }).length;
  const thisYearData = purchaseData.filter((item) => {
    return moment(item.purchase_time) > moment().subtract(1, 'years').startOf('year');
  }).length;
  const lastYearData = purchaseData.filter((item) => {
    return (
      moment(item.purchase_time) < moment().startOf('year') &&
      moment(item.purchase_time) > moment().subtract(1, 'years').startOf('year')
    );
  }).length;

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
          extra={`${moment().format('YYYY-MM-DD')}`}
          split={responsive ? 'horizontal' : 'vertical'}
          headerBordered
          bordered
        >
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: '今年购买量',
                    value: thisYearData,
                    description: (
                      <Statistic
                        title="较去年购买量"
                        value={thisYearData - lastYearData}
                        trend={thisYearData - lastYearData > 0 ? 'up' : 'down'}
                        layout="inline"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: '本月累计购买量',
                    value: thisMonthData,
                    description: (
                      <Statistic
                        title="月同比"
                        value={thisMonthData - lastMonthData}
                        trend={thisMonthData - lastMonthData > 0 ? 'up' : 'down'}
                      />
                    ),
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
                    value: purchaseData?.length,
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
