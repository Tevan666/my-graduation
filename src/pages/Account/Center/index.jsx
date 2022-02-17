import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const Center = () => {
  const [tab, setTab] = useState('1');

  return (
    <>
      <PageContainer>
        <ProCard ghost gutter={(0, 8)}>
          <ProCard
            tabs={{
              top,
              activeKey: tab,
              onChange: (key) => {
                setTab(key);
              },
            }}
          >
            <ProCard.TabPane key="1" tab="管理视图">
              <ProCard headerBordered direction="column">
                <ProCard bordered title="资源管理">
                  qqq
                </ProCard>
                <ProCard bordered title="开发者资源" style={{ marginTop: 20 }}>
                  资源
                </ProCard>
              </ProCard>
            </ProCard.TabPane>
            <ProCard.TabPane key="2" tab="新人指引">
              <ProCard direction="column">
                <ProCard title="操作指引" bordered>
                  <Steps>
                    <Step status="finish" title="Login" icon={<UserOutlined />} />
                    <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
                    <Step status="process" title="Pay" icon={<LoadingOutlined />} />
                    <Step status="wait" title="Done" icon={<SmileOutlined />} />
                  </Steps>
                </ProCard>
                <ProCard title="资源领取" bordered style={{ marginTop: 20 }}>
                  222
                </ProCard>
              </ProCard>
            </ProCard.TabPane>
          </ProCard>

          <ProCard headerBordered direction="column">
            <ProCard bordered>qqq</ProCard>
            <ProCard bordered title="账号信息" style={{ marginTop: 20 }}>
              资源
            </ProCard>
          </ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Center;
