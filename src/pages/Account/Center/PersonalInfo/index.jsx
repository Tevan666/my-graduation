import { useModel } from 'umi';
import { MoneyCollectOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useState } from 'react';
import { ProFormMoney, ModalForm } from '@ant-design/pro-form';
import { message } from 'antd';
import { handlereCharge } from '../user.service';
const PersonalInfo = () => {
  const [rechargeModalVisible, setRechargeModalVisible] = useState(false);
  const {
    initialState: { currentUser },
    refresh,
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
          actions={[
            <MoneyCollectOutlined title="充值" key="momey" onClick={setRechargeModalVisible} />,
          ]}
        >
          <div>
            现金余额: <h2>￥{currentUser?.balances}</h2>
          </div>
        </ProCard>
      </ProCard>
      <ModalForm
        title="充值中心"
        visible={rechargeModalVisible}
        onFinish={async ({ amount }) => {
          await handlereCharge({ amount: amount }).then((res) => {
            if (res.code === 0) {
              message.success(res.message);
              refresh();
            } else {
              message.error(res.message);
            }
          });
          return true;
        }}
        onVisibleChange={setRechargeModalVisible}
      >
        <ProFormMoney
          customSymbol="💰"
          label="最少充值1元"
          name="amount"
          initialValue={22.22}
          min={1}
        />
      </ModalForm>
    </>
  );
};

export default PersonalInfo;
