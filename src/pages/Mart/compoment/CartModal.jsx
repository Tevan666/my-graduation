import ProForm, { DrawerForm, ProFormSelect, ProFormList } from '@ant-design/pro-form';
import { message, Table } from 'antd';
import Form from 'antd/lib/form/Form';
import { useState } from 'react';

const columns = [
  {
    title: '商品名',
    dataIndex: 'name',
  },
  {
    title: '价格',
    dataIndex: 'age',
  },
  {
    title: '描述',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 4; i++) {
  data.push({
    key: i,
    name: `动物识别`,
    age: '$10',
    address: `London, Park Lane no. ${i}`,
  });
}

const CartModal = ({ visible, setVisible }) => {
  const [modalForm] = ProForm.useForm();
  const [currentRow, setCurrentRow] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys changed: ', selectedRows);
      setCurrentRow({ selectedRowKeys });
      modalForm.setFieldsValue({ goods: selectedRows });
      const values = modalForm.getFieldValue('goods');
      console.log(values, 'values');
    },
  };
  return (
    <>
      <DrawerForm
        form={modalForm}
        width="500"
        onVisibleChange={setVisible}
        title="购物车"
        visible={visible}
        onFinish={async (values) => {
          message.success('success');
          console.log(values, 'valuees');
          modalForm.resetFields();
          return true;
        }}
        on
      >
        <ProForm.Item name="goods" rules={[{ required: true, message: '请选择至少一件商品!' }]}>
          <Table
            rowSelection={rowSelection}
            value={modalForm.getFieldValue('goods')}
            columns={columns}
            dataSource={data}
          />
        </ProForm.Item>
      </DrawerForm>
    </>
  );
};

export default CartModal;
