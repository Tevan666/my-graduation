import { Affix, Badge } from 'antd';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { totalState } from '../index';

const ShoppingCar = ({ setCartModalVisible }) => {
  const amount = useRecoilValue(totalState);

  return (
    <>
      <Affix className="cursor-pointer" offsetTop={300} onClick={setCartModalVisible}>
        <Badge count={amount} className="float-right">
          <ShoppingCartOutlined className="text-3xl text-blue-400" />
        </Badge>
      </Affix>
    </>
  );
};

export default ShoppingCar;
