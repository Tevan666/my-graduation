import { useState } from 'react';

import RcResizeObserver from 'rc-resize-observer';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { Button, Popconfirm, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { animalState, plantState } from '../index';
import { useRecoilState } from 'recoil';
import BarChart from './BarChart';
import PieChart from '@/components/Charts/PieChart';
import HorizontalBarChart from '@/components/Charts/HorizontalBarChart';
const { Statistic } = StatisticCard;
const handleCancel = () => {
  message.error('不要拉倒');
};

const TopicMart = (params) => {
  const [responsive, setResponsive] = useState(false);
  const [animalInfo, setAnimalInfo] = useRecoilState(animalState);
  const [plantInfo, setPlantInfo] = useRecoilState(plantState);

  const dayTime = [
    {
      type: '00:00-06:00',
      value: 1,
    },
    {
      type: '06:00-12:00',
      value: 1,
    },
    {
      type: '12:00-18:00',
      value: 1,
    },
    {
      type: '18:00-24:00',
      value: 1,
    },
  ];
  const purchaseData =
    params.type === 'animal'
      ? params?.purchaseData?.filter((data) => data.goods_id === 'gd001')
      : params?.purchaseData?.filter((data) => data.goods_id === 'gd002');
  const uploadData =
    params.type === 'animal'
      ? params?.uploadData?.filter((data) => data.type === 'animal')
      : params?.uploadData?.filter((data) => data.type === 'plant');
  const thisMonthData = purchaseData?.filter((item) => {
    return moment(item.purchase_time) > moment().subtract(1, 'months').startOf('month');
  }).length;
  const lastMonthData = purchaseData?.filter((item) => {
    return (
      moment(item.purchase_time) < moment().startOf('month') &&
      moment(item.purchase_time) > moment().subtract(2, 'months').endOf('month')
    );
  }).length;
  const thisYearData = purchaseData?.filter((item) => {
    return moment(item.purchase_time) > moment().subtract(1, 'years').startOf('year');
  }).length;
  const lastYearData = purchaseData?.filter((item) => {
    return (
      moment(item.purchase_time) < moment().startOf('year') &&
      moment(item.purchase_time) > moment().subtract(1, 'years').startOf('year')
    );
  }).length;
  const purchaseBarData = purchaseData?.map((item) => {
    return (item.purchase_time = moment(item.purchase_time).format('YYYY-MM'));
  });
  let barArr = [];
  const purchaseBarValue = purchaseBarData?.reduce((newArr, item) => {
    if (item in newArr) {
      newArr[item]++;
    } else {
      newArr[item] = 1;
    }
    barArr.push({ time: item, value: newArr[item] });

    return newArr;
  }, {});
  const pieTime = uploadData?.map((item) => {
    const item_obj = {
      ...item,
      upload_time: moment(item.upload_time).isValid && moment(item.upload_time).format('HH:mm:SS'),
    };
    return item_obj;
  });
  pieTime?.map((item) => {
    if (
      moment(item.upload_time, 'hh:mm:ss').isBetween(
        moment('00:00:00', 'hh:mm:ss'),
        moment('06:00:00', 'hh:mm:ss'),
      )
    ) {
      dayTime[0].value++;
    } else if (
      moment(item.upload_time, 'hh:mm:ss').isBetween(
        moment('06:00:00', 'hh:mm:ss'),
        moment('12:00:00', 'hh:mm:ss'),
      )
    ) {
      dayTime[1].value++;
    } else if (
      moment(item.upload_time, 'hh:mm:ss').isBetween(
        moment('12:00:00', 'hh:mm:ss'),
        moment('18:00:00', 'hh:mm:ss'),
      )
    ) {
      dayTime[2].value++;
    } else if (
      moment(item.upload_time, 'hh:mm:ss').isBetween(
        moment('18:00:00', 'hh:mm:ss'),
        moment('24:00:00', 'hh:mm:ss'),
      )
    ) {
      dayTime[3].value++;
    }
  });
  const handleConfirm = () => {
    if (params.type === 'animal') {
      setAnimalInfo({
        ...animalInfo,
        amount: 1,
      });
    }
    if (params.type === 'plant') {
      setPlantInfo({
        ...plantInfo,
        amount: 1,
      });
    }
    message.success('成功添加到购物车');
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
                      okText="立即领取"
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
            {barArr && <StatisticCard title="数量走势" chart={<BarChart data={barArr} />} />}
          </ProCard>
          <StatisticCard
            title="使用时间分布"
            chart={
              <>
                <PieChart data={dayTime} />
                <h2>用户使用次数排名</h2>
                <HorizontalBarChart data={params?.group} />
              </>
            }
          />
        </ProCard>
      </RcResizeObserver>
    </>
  );
};

export default TopicMart;
