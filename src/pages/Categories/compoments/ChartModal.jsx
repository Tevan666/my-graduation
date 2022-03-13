import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Page from '../../../components/Charts/line';
import GaugeChart from '../../../components/Charts/GaugeChart';
const ChartModal = (props) => {
  console.log(props, 'props');
  const titleMap = new Map([
    [1, '折线图'],
    [2, '仪表盘'],
    [3, '柱状图'],
  ]);
  console.log(titleMap.get(props.type), 'title');
  return (
    <Modal
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      title={titleMap.get(props.type)}
    >
      {props.type === 1 && <Page lineData={props.lineData} />}
      {props.type === 2 && <GaugeChart lineData={props.lineData} />}
    </Modal>
  );
};

export default ChartModal;
