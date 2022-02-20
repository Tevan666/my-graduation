import { useState } from 'react';
import { useModel } from 'umi';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProForm, {
  ModalForm,
  ProFormCascader,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

import city from '../city.json';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const handleEdit = (values) => {
  console.log(values);
  message.success('提交成功');
};
const CommonMessage = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const [editModal, setEditModal] = useState(false);
  return (
    <>
      <ProDescriptions
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
            title: '头像',
            key: 'text',
            dataIndex: `${currentUser.avatar}`,
            ellipsis: true,
            copyable: true,
            valueType: 'avatar',
            render: () => {
              return (
                <>
                  <div className="flex items-center">
                    <img className="max-h-20" src={`${currentUser.avatar}`} alt="" />
                    <div className="flex flex-col ml-5">
                      <p>欢迎回来 {currentUser.name}</p>
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>点击更换头像</Button>
                      </Upload>
                    </div>
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
            title: '注册时间',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
          {
            title: '操作',
            valueType: 'option',
            render: () => [
              <a
                target="_blank"
                rel="noopener noreferrer"
                key="link"
                onClick={() => setEditModal(true)}
              >
                编辑
              </a>,
            ],
          },
          {
            title: '自我介绍',
            valueType: 'textarea',
            key: 'description',
            dataIndex: 'description',
          },
        ]}
      />
      <ModalForm
        title="编辑个人资料"
        visible={editModal}
        onVisibleChange={setEditModal}
        onFinish={handleEdit}
        destroyonclose="true"
      >
        <ProForm.Group label="用户名">
          <ProFormText width="md" name="name" tooltip="最长为 10 位" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group label="地区">
          <ProFormCascader
            name="square"
            fieldProps={{
              options: city,
            }}
          />
        </ProForm.Group>
        <ProForm.Group label="自我介绍">
          <ProFormTextArea width="md" name="description" />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default CommonMessage;
