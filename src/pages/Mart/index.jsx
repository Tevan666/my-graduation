import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Select, Space, Affix, Badge } from 'antd';
import { useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import TopicMart from './compoment/TopicMart';
import CartModal from './compoment/CartModal';
const { Option } = Select;

const Mart = () => {
  const [tabPosition, setTabPosition] = useState('left');
  const [tab, setTab] = useState('1');
  const [CartModalVisible, setCartModalVisible] = useState(false);
  const [goodsCount, setGoodsCount] = useState(1);

  return (
    <>
      <PageContainer>
        <Affix className="cursor-pointer" offsetTop={300} onClick={() => setCartModalVisible(true)}>
          <Badge count={goodsCount} className="float-right">
            <ShoppingCartOutlined className="text-3xl text-blue-400" />
          </Badge>
        </Affix>
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
            <TopicMart />
          </ProCard.TabPane>
          <ProCard.TabPane key="2" tab="植物识别">
            <TopicMart />
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
      <CartModal visible={CartModalVisible} setVisible={setCartModalVisible} />
    </>
  );
};

export default Mart;
