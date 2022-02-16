import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';

const Settings = () => {
  return (
    <>
      <PageContainer title="个人设置">
        <ProCard direction="column" ghost>
          <ProCard title="基本信息" headerBordered>
            个人信息
          </ProCard>
        </ProCard>
        <ProCard className="mt-20">
          <ProCard>认证信息</ProCard>
          <ProCard>绑定信息</ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Settings;
