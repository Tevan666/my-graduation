import { EllipsisOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Select, Space, Statistic } from 'antd';
import { useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';

const { Option } = Select;

const Mart = () => {
  const [tabPosition, setTabPosition] = useState('left');
  const [responsive, setResponsive] = useState(false);
  const [tab, setTab] = useState('1');
  return (
    <>
      <PageContainer>
        <Space style={{ marginBottom: 20 }}>
          来试试更换导航栏的位置吧
          <Select
            value={tabPosition}
            onChange={(value) => setTabPosition(value)}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">上</Option>
            <Option value="bottom">下</Option>
            <Option value="left">左</Option>
            <Option value="right">右</Option>
          </Select>
        </Space>
        <ProCard
          tabs={{
            tabPosition,
            activeKey: tab,
            onChange: (key) => {
              setTab(key);
            },
          }}
        >
          <ProCard.TabPane key="1" tab="动物识别">
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard
                title="数据概览"
                extra="2019年9月28日 星期五"
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
                          description: (
                            <Statistic title="较本月平均购买量" value="8.04%" trend="down" />
                          ),
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
                          <Button size="large" type="dashed" className="flex align-middle">
                            限时免费领取
                            <PlusCircleOutlined />
                          </Button>
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
          </ProCard.TabPane>
          <ProCard.TabPane key="2" tab="植物识别">
            <ProCard direction="column">
              <ProCard title="操作指引" bordered></ProCard>
              <ProCard title="资源领取" bordered style={{ marginTop: 20 }}>
                222
              </ProCard>
            </ProCard>
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Mart;
