import ProCard from '@ant-design/pro-card';
import { Steps, Button } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { history } from 'umi';
const { Step } = Steps;

const NewGuide = () => {
  return (
    <>
      <ProCard.Group direction="column">
        <ProCard title="操作指引" bordered>
          <Steps>
            <Step status="finish" title="登录" icon={<UserOutlined />} />
            <Step status="finish" title="领取/购买功能" icon={<SolutionOutlined />} />
            <Step status="process" title="体验功能" icon={<LoadingOutlined />} />
            <Step status="wait" title="完成" icon={<SmileOutlined />} />
          </Steps>
        </ProCard>
        <ProCard title="资源领取" bordered style={{ marginTop: 20 }}>
          <Button type="link" onClick={() => history.push('/mart')}>
            点我去功能领取/购买功能
          </Button>
        </ProCard>
      </ProCard.Group>
    </>
  );
};

export default NewGuide;
