import React, { useEffect, useState, useRef } from 'react';
import {
  HeartTwoTone,
  SmileTwoTone,
  DatabaseOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import {
  Card,
  Typography,
  Alert,
  Row,
  Col,
  Avatar,
  Steps,
  Upload,
  Modal,
  Collapse,
  Tag,
  Button,
  Table,
  Comment,
  Tooltip,
} from 'antd';
import { useIntl } from 'umi';

import { PlusOutlined, GlobalOutlined } from '@ant-design/icons';
import ProForm from '@ant-design/pro-form';
import Page from '../../components/Charts/line';

import { getResults } from './category.service';
import GaugeChart from '../../components/Charts/GaugeChart';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import CarouselComponent from '@/components/Carousel';
import ChartModal from './compoments/chartModal';

import CategoryCompoment from './compoments/CategoryCompoment';
const { Meta } = Card;

const { Step } = Steps;

const { Panel } = Collapse;

const commentColumns = [
  {
    type: 1,
    title: '折线图',
    content:
      '折线图是排列在工作表的列或行中的数据可以绘制到折线图中。折线图可以显示随预测分数（根据常用比例设置）而变化的连续数据，因此非常适用于显示数据的趋势。',
    url: 'https://joeschmoe.io/api/v1/random',
  },
  {
    type: 2,
    title: '仪表盘',
    content:
      '仪表盘图类似汽车内的里程表，常用于反应目标达成率或者是目标的完成情况，从直观上了解数据内容，展现目标的达成和变化情况。',
    url: 'https://joeschmoe.io/api/v1/male/joe',
  },
  {
    type: 3,
    title: '柱状图',
    content:
      '柱形图，又称长条图、柱状统计图、条状图、棒形图，是一种以长方形的长度为变量的统计图表。',
    url: 'https://joeschmoe.io/api/v1/female/jane',
  },
];

const columns = [
  {
    title: '分类结果',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: '百科地址',
    width: 120,
    dataIndex: 'url',
    fixed: 'left',
  },
  {
    title: '图片预览',
    width: 120,
    dataIndex: 'img',
    fixed: 'left',
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'status',
    fixed: 'left',
  },
  {
    title: '操作',
    width: 120,
    fixed: 'left',
    render: () => <a>入库</a>,
  },
];
let historyList = [
  {
    name: '龙',
    key: 1,
    url: 'www.baidu.com',
    img: 'www.baidu.com',
    status: '已入库',
  },
  {
    name: '鸟',
    key: 2,
    url: 'www.baidu.com',
    img: 'www.baidu.com',
    status: '已入库',
  },
  {
    name: '蛇',
    key: 3,
    url: 'www.baidu.com',
    img: 'www.baidu.com',
    status: '未入库',
  },
  {
    name: '鱼',
    key: 4,
    url: 'www.baidu.com',
    img: 'www.baidu.com',
    status: '已入库',
  },
];
const Animal = () => {
  const [lineData, setLineData] = useState('');
  const intl = useIntl();
  const [image, setImage] = useState('');
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('wait');
  const [chartsModal, setChartsModal] = useState(false);
  const [chartType, setChartType] = useState();
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });

  const handleCancel = () => setState({ previewVisible: false, fileList: fileList });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(file.preview, 'file');
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      fileList: fileList,
    });
  };

  const handleChange = ({ fileList }) => {
    setState({ fileList });
  };
  const { previewVisible, previewImage, fileList, previewTitle } = state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCheckModal = (key) => {
    setChartType(key);
    setChartsModal(true);
  };
  const handleModalCancel = () => {
    setChartsModal(false);
  };
  const handleModalOk = () => {
    setChartsModal(false);
  };
  const getResult = async () => {
    setStatus('process');
    if (fileList.length && fileList[0].thumbUrl) {
      const imgURL = fileList[0].thumbUrl;
      const reg = /.+(base64,)/;
      //需要对url进行解码
      setImage(encodeURIComponent(imgURL.replace(reg, '')));
      if (image) {
        const res = await getResults(image, 1, 'animal');
        setLineData(res.result);
        setStep(1);
        setStatus('finish');
      } else {
        setStatus('error');
      }
    }
  };

  return (
    <>
      <CategoryCompoment type="animal" />
    </>
  );
};

export default Animal;
