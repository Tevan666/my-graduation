import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Page from '../../../components/Charts/line';
import GaugeChart from '../../../components/Charts/GaugeChart';
import ColumnChart from '@/components/Charts/columnChart';
const ChartModal = (props) => {
  const titleMap = new Map([
    [1, '折线图'],
    [2, '仪表盘'],
    [3, '柱状图'],
  ]);
  return (
    <Modal
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      title={titleMap.get(props.type)}
    >
      {props.type === 1 && <Page lineData={props.lineData} />}
      {props.type === 2 && <GaugeChart lineData={props.lineData} />}
      {props.type === 3 && <ColumnChart data={props.lineData} type="function" />}
    </Modal>
  );
};

export default ChartModal;
