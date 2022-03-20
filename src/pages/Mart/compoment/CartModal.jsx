import ProForm, { DrawerForm, ProFormSelect, ProFormList } from '@ant-design/pro-form';
import { message, Table } from 'antd';
import Form from 'antd/lib/form/Form';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { plantState, animalState } from '../index';
const columns = [
  {
    title: '商品名',
    dataIndex: 'name',
  },
  {
    title: '数量',
    dataIndex: 'amount',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
];

const CartModal = ({ visible, setVisible }) => {
  const [modalForm] = ProForm.useForm();
  const [currentRow, setCurrentRow] = useState([]);

  const [animalInfo, setAnimalInfo] = useRecoilState(animalState);
  const [plantInfo, setPlantInfo] = useRecoilState(plantState);

  const data = [plantInfo, animalInfo];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys changed: ', selectedRows);
      setCurrentRow({ selectedRowKeys });
      modalForm.setFieldsValue({ goods: selectedRows });
      const values = modalForm.getFieldValue('goods');
      console.log(values, 'values');
    },
    getCheckboxProps: (record) => ({
      disabled: record.amount === 0,
    }),
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
