import { useEffect, useState } from 'react';

import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, message, Modal, Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';
import { useModel } from 'umi';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';

import CommonMessage from './CommonMessage';

import { bindEmail } from '../account-service';
const handleDelete = () => {
  Modal.confirm({
    title: '你确定?',
    content: '确定要注销吗',
    onOk() {
      message.success('删除成功');
    },
    onCancel() {
      message.warning('爱你么么哒');
    },
  });
};

const Settings = () => {
  const [dataSource, setDataSource] = useState([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const defaultData = [
    {
      id: '1',
      name: '绑定手机号',
      image: <PhoneOutlined />,
      desc: currentUser?.phone || '-',
    },
    {
      id: '2',
      name: '绑定邮箱',
      image: <WhatsAppOutlined />,
      desc: currentUser?.email || '-',
    },
    {
      id: '3',
      name: '蚂蚁金服体验科技',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: '我是一条测试的描述',
    },
    {
      id: '4',
      name: 'TechUI',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: '我是一条测试的描述',
    },
  ];
  useEffect(() => {
    setDataSource(defaultData);
  }, []);
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
              <Alert
                message="您可以在此注销当前账号。账号注销成功后,当前账号内的所有服务将不可用,除法律法规另有规定外,当前账号内信息、数据将被删除，且无法恢复。"
                type="error"
              />
              <Button className="mt-5" type="primary" danger onClick={handleDelete}>
                我要注销！！！
              </Button>
            </ProCard>
            <ProCard title="其他联系方式" headerBordered style={{ marginTop: 24 }}>
              你还有其他方式???
            </ProCard>
          </ProCard>
          <ProCard title="安全信息" headerBordered>
            <ProList
              rowKey="id"
              dataSource={dataSource}
              editable={{
                onSave: async (key, record, originRow) => {
                  if (record.name === '绑定邮箱') {
                    await bindEmail({ email: record.desc }).then((res) => {
                      if (res.code === 0) {
                        message.success(res.message);
                      } else if (res.message) {
                        message.error(res.message);
                      }
                    });
                  } else if (record.name === '绑定手机号') {
                    await bindEmail({ phone: record.desc }).then((res) => {
                      if (res.code === 0) {
                        message.success(res.message);
                      } else if (res.message) {
                        message.error(res.message);
                      }
                    });
                  }
                  return true;
                },
                actionRender: (row, config, dom) => [dom.save, dom.cancel],
              }}
              onDataSourceChange={setDataSource}
              metas={{
                title: {
                  dataIndex: 'name',
                },
                avatar: {
                  dataIndex: 'image',
                  editable: false,
                },
                description: {
                  dataIndex: 'desc',
                },
                actions: {
                  render: (text, row, index, action) => [
                    <a
                      onClick={() => {
                        action?.startEditable(row.id);
                      }}
                      key="link"
                    >
                      编辑
                    </a>,
                  ],
                },
              }}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Settings;
