import { useModel } from 'umi';
import { MoneyCollectOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';

const PersonalInfo = () => {
  const {
    initialState: { currentUser },
  } = useModel('@@initialState');
  console.log(currentUser, 'currentUser');
  return (
    <>
      <ProCard headerBordered direction="column" colSpan={8}>
        <ProCard bordered>
          <ProDescriptions
            layout="vertical"
            dataSource={{
              id: '这是一段文本columns',
              create_time: currentUser?.create_time,
              money: currentUser?.balances,
              square: currentUser?.square,
              description: currentUser?.description,
              status: currentUser?.status,
            }}
            columns={[
              {
                title: `${currentUser?.name}`,
                key: 'text',
                dataIndex: `${currentUser?.avatar}`,
                ellipsis: true,
                copyable: true,
                valueType: 'avatar',
                render: () => {
                  return (
                    <>
                      <div className="flex items-center">
                        <img className="max-h-10" src={`${currentUser?.avatar}`} alt="" />
                      </div>
                    </>
                  );
                },
              },
              {
                title: '账号状态',
                key: 'status',
                dataIndex: 'status',
                valueType: 'select',
                valueEnum: {
                  all: { text: '全部', status: 'Default' },
                  invalid: {
                    text: '异常',
                    status: 'Error',
                  },
                  valid: {
                    text: '正常',
                    status: 'Success',
                  },
                },
              },
              {
                title: '所在地区',
                key: 'square',
                dataIndex: 'square',
              },
              {
                title: '自我介绍',
                valueType: 'textarea',
                key: 'description',
                dataIndex: 'description',
              },
            ]}
          />
        </ProCard>
        <ProCard
          bordered
          title="账号信息"
          style={{ marginTop: 20 }}
          actions={[<MoneyCollectOutlined title="充值" key="momey" />]}
        >
          <div>
            现金余额: <h2>￥{currentUser?.balances}</h2>
          </div>
        </ProCard>
      </ProCard>
    </>
  );
};

export default PersonalInfo;
