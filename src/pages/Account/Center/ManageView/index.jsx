import { useEffect, useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import moment from 'moment';
import ProCard from '@ant-design/pro-card';
import { Button } from 'antd';
import { BarChartOutlined, DotChartOutlined, AreaChartOutlined } from '@ant-design/icons';
import { getUserUploadRecord } from '../user.service';
import BarChart from '@/pages/Mart/compoment/BarChart';
import ScatterChart from './component/scatterChart';
import ColumnChart from '@/components/Charts/columnChart';

const { Divider } = StatisticCard;

const formatData = (data) => {
  const total = [
    { type: '2021-01', value: 0 },
    { type: '2021-02', value: 0 },
    { type: '2021-03', value: 0 },
    { type: '2021-04', value: 0 },
    { type: '2021-05', value: 0 },
    { type: '2021-06', value: 0 },
    { type: '2021-07', value: 0 },
    { type: '2021-08', value: 0 },
    { type: '2021-09', value: 0 },
    { type: '2021-10', value: 0 },
    { type: '2021-11', value: 0 },
    { type: '2021-12', value: 0 },
    { type: '2022-01', value: 0 },
    { type: '2022-02', value: 0 },
    { type: '2022-03', value: 0 },
    { type: '2022-04', value: 0 },
    { type: '2022-05', value: 0 },
    { type: '2022-06', value: 0 },
    { type: '2022-07', value: 0 },
    { type: '2022-08', value: 0 },
    { type: '2022-09', value: 0 },
    { type: '2022-10', value: 0 },
    { type: '2022-11', value: 0 },
    { type: '2022-12', value: 0 },
  ];
  data.map((dataItem) => {
    total.forEach((item) => {
      if (item.type === dataItem.type) {
        item.value = dataItem.value;
      }
    });
  });
  return total;
};

const getTimeList = (data) => {
  const purchaseBarData = data?.map((item) => {
    return (item.upload_time = moment(item.upload_time).format('YYYY-MM'));
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
  return barArr;
};

const ManageView = () => {
  const [responsive, setResponsive] = useState(false);
  const [animalRecord, setAnimalRecord] = useState();
  const [plantRecord, setPlantRecord] = useState();
  const itemsData = [
    { type: '2021-04', value: 1 },
    { type: '2021-05', value: 4 },

    { type: '2021-08', value: 1 },

    { type: '2021-10', value: 2 },

    { type: '2022-01', value: 1 },
    { type: '2022-02', value: 3 },
  ];
  const getUploadRecord = async (type) => {
    if (type === 'animal') {
      const record = await getUserUploadRecord({ type: type });
      setAnimalRecord(record);
    } else if (type === 'plant') {
      const record = await getUserUploadRecord({ type: type });
      setPlantRecord(record);
    }
  };
  const animalTime = animalRecord && getTimeList(animalRecord.data);
  const plantTime = plantRecord && getTimeList(plantRecord.data);
  console.log(animalTime, 'animalTime');
  useEffect(() => {
    getUploadRecord('animal');
    getUploadRecord('plant');
  }, []);
  return (
    <>
      <ProCard.Group headerBordered direction="column">
        <ProCard bordered title="资源管理">
          <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
              setResponsive(offset.width < 596);
            }}
          >
            <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
              <StatisticCard
                statistic={{
                  title: '动物识别',
                  icon: <BarChartOutlined />,
                  value: animalRecord?.total,
                  suffix: '次',
                }}
                chart={animalTime && <BarChart data={animalTime} />}
              />
              <Divider type={responsive ? 'horizontal' : 'vertical'} />
              <StatisticCard
                statistic={{
                  title: '植物识别',
                  icon: <DotChartOutlined />,
                  value: plantRecord?.total,
                  suffix: '次',
                }}
                chart={plantTime && <ScatterChart data={plantTime} />}
              />
              <Divider type={responsive ? 'horizontal' : 'vertical'} />
              <StatisticCard
                statistic={{
                  title: '物体识别',
                  icon: <AreaChartOutlined />,
                  value: 5,
                  suffix: '次',
                }}
                chart={<ColumnChart data={formatData(itemsData)} type="center" />}
              />
            </StatisticCard.Group>
          </RcResizeObserver>
        </ProCard>
        <ProCard bordered title="开发者资源" style={{ marginTop: 20 }}>
          <div className="flex justify-around">
            <Button type="primary">OpenAPI</Button>
            <Button type="primary">SDK中心</Button>
            <Button type="primary">开发者中心</Button>
            <Button type="primary">API Explorer</Button>
          </div>
        </ProCard>
      </ProCard.Group>
    </>
  );
};

export default ManageView;
