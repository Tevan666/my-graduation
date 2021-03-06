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
  message.error('δΈθ¦ζε');
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
    message.success('ζεζ·»ε ε°θ΄­η©θ½¦');
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
          title="ζ°ζ?ζ¦θ§"
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
                    title: 'δ»εΉ΄θ΄­δΉ°ι',
                    value: thisYearData,
                    description: (
                      <Statistic
                        title="θΎε»εΉ΄θ΄­δΉ°ι"
                        value={thisYearData - lastYearData}
                        trend={thisYearData - lastYearData > 0 ? 'up' : 'down'}
                        layout="inline"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'ζ¬ζη΄―θ?‘θ΄­δΉ°ι',
                    value: thisMonthData,
                    description: (
                      <Statistic
                        title="ζεζ―"
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
                      title="ιζΆεθ΄Ήι’εε¦ εε°εεΎοΌοΌοΌ"
                      onConfirm={handleConfirm}
                      onCancel={handleCancel}
                      okText="η«ε³ι’ε"
                      cancelText="η?δΊζδΈθ¦δΊ"
                    >
                      <Button size="large" type="dashed" className="flex align-middle">
                        ιζΆεθ΄Ήι’ε
                        <PlusCircleOutlined />
                      </Button>
                    </Popconfirm>
                  }
                />
                <StatisticCard
                  statistic={{
                    title: 'εε²θ΄­δΉ°ζ»ζ°',
                    value: purchaseData?.length,
                    suffix: 'δΈͺ',
                  }}
                />
              </ProCard>
            </ProCard>
            {barArr && <StatisticCard title="ζ°ιθ΅°εΏ" chart={<BarChart data={barArr} />} />}
          </ProCard>
          <StatisticCard
            title="δ½Ώη¨ζΆι΄εεΈ"
            chart={
              <>
                <PieChart data={dayTime} />
                <h2>η¨ζ·δ½Ώη¨ζ¬‘ζ°ζε</h2>
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
