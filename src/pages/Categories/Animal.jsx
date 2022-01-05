import React, { useEffect, useState, useRef } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProForm from '@ant-design/pro-form';
import Page from './line';
import { Collapse } from 'antd';
import { useRequest } from 'umi';
import { getResults } from './category.service';
import GaugeChart from './GaugeChart';

const { Panel } = Collapse;
const Animal = () => {
  const [lineData, setLineData] = useState('');
  const intl = useIntl();
  const [image, setImage] = useState('');
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
    if (fileList.length && fileList[0].thumbUrl) {
      const imgURL = fileList[0].thumbUrl;
      const reg = /.+(base64,)/;
      //需要对url进行解码
      setImage(encodeURIComponent(imgURL.replace(reg, '')));
      if (image) {
        const res = await getResults(image, 1);
        setLineData(res.result);
      }
      // fetch(
      //   'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token=24.ba42db818351143b0b0808785d427fa8.2592000.1643275108.282335-25425850',
      //   {
      //     method: 'post',
      //     headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      //     body: `image=${image}&baike_num=1`,
      //   },
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);
      //     setLineData(data.result);
      //   });
    }
  };

  return (
    <Card style={{ marginBottom: 20 }}>
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
        <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
      </Typography.Title>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Card>
  );
};

export default Animal;
