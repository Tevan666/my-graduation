import ProCard from '@ant-design/pro-card';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const NewGuide = () => {
  return (
    <>
      <ProCard.Group direction="column">
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
      </ProCard.Group>
    </>
  );
};

export default NewGuide;
