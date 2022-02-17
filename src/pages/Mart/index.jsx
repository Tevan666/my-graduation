import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const Mart = () => {
  const [tabPosition, setTabPosition] = useState('left');

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
            <ProCard headerBordered direction="column">
              <ProCard bordered title="资源管理">
                qqq
              </ProCard>
              <ProCard bordered title="开发者资源" style={{ marginTop: 20 }}>
                资源
              </ProCard>
            </ProCard>
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
