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
import Page from '../../../components/Charts/line';

import { getResults } from '../category.service';
import GaugeChart from '../../../components/Charts/GaugeChart';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import CarouselComponent from '@/components/Carousel';
import ChartModal from '../compoments/chartModal';
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
    search: false,
  },
  {
    title: '图片预览',
    width: 120,
    dataIndex: 'img',
    fixed: 'left',
    search: false,
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
    search: false,
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

const CategoryCompoment = (props) => {
  const [lineData, setLineData] = useState('');
  const intl = useIntl();
  const [image, setImage] = useState('');
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('wait');
  const [chartsModal, setChartsModal] = useState(false);
  const [chartType, setChartType] = useState();
  const categoryTitle = new Map([
    ['animal', '动物'],
    ['plant', '植物'],
    ['matter', '物体'],
  ]);
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
        const res = await getResults(image, 1, props.type);
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
      <Card title="功能介绍" bordered="false" style={{ marginBottom: 24 }}>
        <Alert
          message={intl.formatMessage({
            id: `pages.welcome.${props.type}`,
            defaultMessage: '识别近八千种动物',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Row gutter={[16, 16]} align="middle" className="mb-5">
          <Col span={6}>
            <Card
              style={{ width: 300 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={categoryTitle.get(props.type) + '分类'}
                description="让我来给你介绍下功能吧"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Tag icon={<GlobalOutlined spin />} color="#55acee">
              返回{categoryTitle.get(props.type)}名称
            </Tag>
          </Col>
          <Col span={6}>
            <Tag icon={<RadarChartOutlined spin />} color="#3b5999">
              返回{categoryTitle.get(props.type)}百科信息
            </Tag>
          </Col>
          <Col span={6}>
            <Tag icon={<DatabaseOutlined spin />} color="#52c41a">
              返回多种分类结果
            </Tag>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <CarouselComponent type={props.type} />
          </Col>
        </Row>
      </Card>
      <Card style={{ marginBottom: 20 }}>
        <Steps current={step} percent={100} status={status} style={{ marginBottom: 24 }}>
          <Step title="上传图片" description="图片类型支持PNG、JPG、JPEG、BMP，大小不超过4M。" />
          <Step title="进行分类" subTitle="即刻体验" />
          <Step title="保存记录" description="保存分类记录" />
        </Steps>
        <Row gutter={[16, 16]} justify="space-around">
          <Col span={10}>
            <ProForm onFinish={getResult}>
              <Upload
                action="v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </ProForm>
            {lineData ? (
              <Collapse ghost defaultActiveKey={['1']}>
                <Panel header="详细信息" key="1">
                  <a href={lineData[0].baike_info.baike_url} target="_blank" rel="noreferrer">
                    点我去百科
                  </a>
                  <p style={{ textIndnt: '2em' }}>{lineData[0].baike_info.description}</p>
                </Panel>
              </Collapse>
            ) : null}
          </Col>
          <Col span={14}>
            <>
              {lineData &&
                commentColumns.map((item) => {
                  return (
                    <Comment
                      key={item.type}
                      author={
                        <>
                          {item.title}{' '}
                          <Button className="ml-10" onClick={() => handleCheckModal(item.type)}>
                            点击查看
                          </Button>
                        </>
                      }
                      avatar={<Avatar src={item.url} alt="Han Solo" />}
                      content={<p>{item.content}</p>}
                    />
                  );
                })}
            </>
          </Col>
        </Row>
        <ChartModal
          visible={chartsModal}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
          type={chartType}
          lineData={lineData}
        />
        <Typography.Title
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          <SmileTwoTone /> I <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Card>
      <Card title="分类历史">
        <ProTable
          columns={columns}
          options={false}
          rowSelection={{
            // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
            // 注释该行则默认不显示下拉选项
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            defaultSelectedRowKeys: [1],
          }}
          rowKey="key"
          toolBarRender={() => [<Button key="show">记录入库</Button>]}
          dataSource={historyList}
        />
      </Card>
    </>
  );
};

export default CategoryCompoment;
