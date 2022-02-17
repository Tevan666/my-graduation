import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import CommonMessage from './CommonMessage';

const Settings = () => {
  return (
    <>
      <PageContainer title="个人设置">
        <ProCard ghost hoverable>
          <ProCard title="基本信息" headerBordered>
            <CommonMessage />
          </ProCard>
        </ProCard>
        <ProCard style={{ marginTop: 24 }} ghost gutter={(0, 8)}>
          <ProCard ghost gutter={(0, 8)} direction="column">
            <ProCard title="账号注销" headerBordered>
              1
            </ProCard>
            <ProCard title="其他联系方式" headerBordered style={{ marginTop: 24 }}>
              2
            </ProCard>
          </ProCard>
          <ProCard title="安全信息" headerBordered h>
            绑定信息
          </ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Settings;
