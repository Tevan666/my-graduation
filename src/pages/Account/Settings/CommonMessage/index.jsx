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
import { updateUser } from '../../account-service';

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

const CommonMessage = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { currentUser } = initialState;
  const [editModal, setEditModal] = useState(false);

  const handleEdit = async (values) => {
    let square = values.square.join().replace(/\,/g, '');
    const params = { ...values, square: square };
    await updateUser(params).then((res) => {
      if (res.code === 0) {
        message.success(res.message);
        setEditModal(false);
        refresh();
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <>
      <ProDescriptions
        dataSource={{
          id: '这是一段文本columns',
          date: currentUser?.create_time,
          money: currentUser?.balances,
          state: currentUser?.status,
          square: currentUser?.square,
          description: currentUser?.description,
        }}
        columns={[
          {
            title: '头像',
            key: 'text',
            dataIndex: `${currentUser?.avatar}`,
            ellipsis: true,
            copyable: true,
            valueType: 'avatar',
            render: () => {
              return (
                <>
                  <div className="flex items-center">
                    <img className="max-h-20" src={`${currentUser?.avatar}`} alt="" />
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
          <ProFormText
            rules={[{ required: true, message: '请输入用户名' }]}
            width="md"
            name="username"
            tooltip="最长为 10 位"
            placeholder="请输入名称"
            initialValue={currentUser?.name}
          />
        </ProForm.Group>
        <ProForm.Group label="地区">
          <ProFormCascader
            rules={[{ required: true, message: '请选择地区' }]}
            name="square"
            fieldProps={{
              options: city,
            }}
          />
        </ProForm.Group>
        <ProForm.Group label="自我介绍">
          <ProFormTextArea
            rules={[{ required: true, message: '请输入自我介绍' }]}
            width="md"
            name="description"
            initialValue={currentUser?.description}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default CommonMessage;
