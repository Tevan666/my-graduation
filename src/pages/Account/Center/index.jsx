import { useState } from 'react';

import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';

import ManageView from './ManageView';
import NewGuide from './NewGuide';
import PersonalInfo from './PersonalInfo';
const Center = () => {
  const [tab, setTab] = useState('1');

  return (
    <>
      <PageContainer>
        <ProCard ghost gutter={(0, 8)}>
          <ProCard
            colSpan={16}
            tabs={{
              top,
              activeKey: tab,
              onChange: (key) => {
                setTab(key);
              },
            }}
          >
            <ProCard.TabPane key="1" tab="管理视图">
              <ManageView />
            </ProCard.TabPane>
            <ProCard.TabPane key="2" tab="新人指引">
              <NewGuide />
            </ProCard.TabPane>
          </ProCard>

          <PersonalInfo />
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Center;
