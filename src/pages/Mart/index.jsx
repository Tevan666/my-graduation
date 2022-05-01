import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Select, Space, Affix, Badge } from 'antd';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import TopicMart from './compoment/TopicMart';
import CartModal from './compoment/CartModal';
import ShoppingCar from './compoment/ShoppingCar';
import { getPurchaseRecord, getUploadHistory } from './mart.service';

const { Option } = Select;

export const animalState = atom({
  key: 'animalInfo',
  default: {
    key: 'animal',
    name: '动物',
    amount: 0,
    description: '动物识别',
  },
});

export const plantState = atom({
  key: 'plantInfo',
  default: {
    key: 'plant',
    name: '植物',
    amount: 0,
    description: '植物识别',
  },
});

export const totalState = selector({
  key: 'totalAmount',
  get: ({ get }) => {
    const amount = get(animalState).amount + get(plantState).amount;
    return amount;
  },
});

const Mart = () => {
  const [tabPosition, setTabPosition] = useState('left');
  const [tab, setTab] = useState('1');
  const [CartModalVisible, setCartModalVisible] = useState(false);
  const [goodsCount, setGoodsCount] = useState(1);
  const [purchaseData, setPurchaseData] = useState([]);
  const [uploadData, setUploadData] = useState([]);

  useEffect(() => {
    getPurchaseRecord().then((res) => {
      setPurchaseData(res);
    });
    getUploadHistory().then((res) => {
      setUploadData(res);
    });
  }, []);
  return (
    <>
      <RecoilRoot>
        <PageContainer>
          <ShoppingCar setCartModalVisible={setCartModalVisible} />
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
              {purchaseData && (
                <TopicMart
                  purchaseData={purchaseData.data}
                  uploadData={uploadData.data}
                  group={uploadData.group}
                  type="animal"
                />
              )}
            </ProCard.TabPane>
            <ProCard.TabPane key="2" tab="植物识别">
              {purchaseData && (
                <TopicMart
                  purchaseData={purchaseData.data}
                  uploadData={uploadData.data}
                  group={uploadData.group}
                  type="plant"
                />
              )}
            </ProCard.TabPane>
          </ProCard>
        </PageContainer>
        <CartModal visible={CartModalVisible} setVisible={setCartModalVisible} />
      </RecoilRoot>
    </>
  );
};

export default Mart;
