import { useModel } from 'umi';

import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';

const PersonalInfo = () => {
  const {
    initialState: { currentUser },
  } = useModel('@@initialState');

  return (
    <>
      <ProCard headerBordered direction="column" colSpan={8}>
        <ProCard bordered>
          <ProDescriptions
            layout="vertical"
            dataSource={{
              id: '这是一段文本columns',
              date: '20200809',
              money: '1212100',
              state: 'closed',
              square: '广东佛山',
              description: '我就是我， 不一样的烟火',
            }}
            columns={[
              {
                title: `${currentUser.name}`,
                key: 'text',
                dataIndex: `${currentUser.avatar}`,
                ellipsis: true,
                copyable: true,
                valueType: 'avatar',
                render: () => {
                  return (
                    <>
                      <div className="flex items-center">
                        <img className="max-h-10" src={`${currentUser.avatar}`} alt="" />
                      </div>
                    </>
                  );
                },
              },
              {
                title: '账号状态',
                key: 'state',
                dataIndex: 'state',
                valueType: 'select',
                valueEnum: {
                  all: { text: '全部', status: 'Default' },
                  open: {
                    text: '异常',
                    status: 'Error',
                  },
                  closed: {
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
        <ProCard bordered title="账号信息" style={{ marginTop: 20 }}>
          你充Q币嘛 你充Q币嘛 你充Q币嘛 你充Q币嘛
        </ProCard>
      </ProCard>
    </>
  );
};

export default PersonalInfo;
