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
} from 'antd';
import { useIntl } from 'umi';

import { PlusOutlined, GlobalOutlined } from '@ant-design/icons';
import ProForm from '@ant-design/pro-form';
import Page from './line';

import { getResults } from './category.service';
import GaugeChart from './GaugeChart';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const { Step } = Steps;

const { Panel } = Collapse;
const Animal = () => {
  const [lineData, setLineData] = useState('');
  const intl = useIntl();
  const [image, setImage] = useState('');
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('wait');
  const gridStyle = {
    textAlign: 'center',
  };
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
      <Card title="功能介绍" bordered="false" style={{ marginBottom: 24 }}>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.animal',
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
        <Row gutter={[16, 16]}>
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
                title="动物分类"
                description="让我来给你介绍下功能吧"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Tag icon={<GlobalOutlined spin />} color="#55acee">
              返回动物名称
            </Tag>
          </Col>
          <Col span={6}>
            <Tag icon={<RadarChartOutlined spin />} color="#3b5999">
              返回动物百科信息
            </Tag>
          </Col>
          <Col span={6}>
            <Tag icon={<DatabaseOutlined spin />} color="#52c41a">
              返回多种分类结果
            </Tag>
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
                  <p>{lineData[0].baike_info.description}</p>
                </Panel>
              </Collapse>
            ) : null}
          </Col>
          <Col span={14}>{lineData ? <GaugeChart lineData={lineData} /> : null}</Col>
        </Row>
        {lineData ? <Page lineData={lineData} /> : null}
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
    </>
  );
};

export default Animal;
