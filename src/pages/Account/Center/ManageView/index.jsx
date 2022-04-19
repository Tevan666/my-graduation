import { useEffect, useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

import ProCard from '@ant-design/pro-card';
import { Button } from 'antd';
import { BarChartOutlined, DotChartOutlined, AreaChartOutlined } from '@ant-design/icons';
import { getUserUploadRecord } from '../user.service';
const { Divider } = StatisticCard;

const ManageView = () => {
  const [responsive, setResponsive] = useState(false);
  const [animalRecord, setAnimalRecord] = useState();
  const [plantRecord, setPlantRecord] = useState();

  const getUploadRecord = async (type) => {
    if (type === 'animal') {
      const record = await getUserUploadRecord({ type: type });
      setAnimalRecord(record);
    } else if (type === 'plant') {
      const record = await getUserUploadRecord({ type: type });
      setPlantRecord(record);
    }
  };
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
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                    alt="直方图"
                    width="100%"
                  />
                }
              />
              <Divider type={responsive ? 'horizontal' : 'vertical'} />
              <StatisticCard
                statistic={{
                  title: '植物识别',
                  icon: <DotChartOutlined />,
                  value: plantRecord?.total,
                  suffix: '次',
                }}
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                    alt="直方图"
                    width="100%"
                  />
                }
              />
              <Divider type={responsive ? 'horizontal' : 'vertical'} />
              <StatisticCard
                statistic={{
                  title: '物体识别',
                  icon: <AreaChartOutlined />,
                  value: 5,
                  suffix: '次',
                }}
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                    alt="直方图"
                    width="100%"
                  />
                }
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
