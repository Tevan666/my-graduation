import { useState, useRef } from 'react';
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
  Modal,
  Collapse,
  Tag,
  Button,
  Comment,
  message,
  Tooltip,
  Image,
  Divider,
} from 'antd';
import { useIntl, useModel } from 'umi';

import { GlobalOutlined } from '@ant-design/icons';
import ProForm, { ProFormUploadButton } from '@ant-design/pro-form';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import CarouselComponent from '@/components/Carousel';
import ChartModal from '../compoments/chartModal';
import { rule } from '@/services/ant-design-pro/api';
import { getResults, uploadHistory, handleMatterCategory } from '../category.service';
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
    dataIndex: 'baike_url',
    fixed: 'left',
    search: false,
    render: (text) => {
      return (
        <Tooltip title={text}>
          <span className="truncate">{text.substring(0, 10)}...</span>
        </Tooltip>
      );
    },
  },
  {
    title: '图片预览',
    width: 120,
    dataIndex: 'img_url',
    fixed: 'left',
    search: false,
    render: (text) => {
      return (
        <Tooltip title={text}>
          <span className="truncate">{text.substring(0, 10)}...</span>
        </Tooltip>
      );
    },
  },
  {
    title: '描述',
    width: 120,
    dataIndex: 'description',
    fixed: 'left',
    search: false,
    render: (text) => {
      return (
        <Tooltip title={text + '...'}>
          <span className="truncate">{text.substring(0, 20)}...</span>
        </Tooltip>
      );
    },
  },
];

const matterMap = new Map([
  [0, 'bird'],
  [1, 'book'],
  [2, 'butterfly'],
  [3, 'cattle'],
  [4, 'chicken'],
  [5, 'elephant'],
  [6, 'horse'],
  [7, 'phone'],
  [8, 'sheep'],
  [9, 'shoes'],
  [10, 'spider'],
  [11, 'squirrel'],
  [12, 'watch'],
]);
const CategoryCompoment = (props) => {
  const [lineData, setLineData] = useState('');
  const intl = useIntl();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('wait');
  const [chartsModal, setChartsModal] = useState(false);
  const [chartType, setChartType] = useState();
  const tableRef = useRef();
  const [matterArr, setMatterArr] = useState([]);
  const [imgVisible, setImgVisible] = useState(false);
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
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
  const handleCancel = () => setState({ previewVisible: false, fileList: fileList });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
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
  const getResult = async (values) => {
    console.log(values, 'value');
    setStatus('process');
    if (props.type === 'matter') {
      const matter = [];
      values.filelist.map(async (file) => {
        const data = file.thumbUrl.substring(file.thumbUrl.indexOf(',') + 1);
        const params = {
          type: file.type,
          data: data,
        };
        const result = await handleMatterCategory(params);
        const imgArr = [];
        if (result.code === 200) {
          const url = await getBase64(file.originFileObj);
          const isRepeat =
            matter &&
            matter.some((item) => {
              if (item.type === matterMap.get(result.data.result_type)) {
                item.imgSrc.push(url);
              }
              return item.type === matterMap.get(result.data.result_type);
            });
          if (matter.length == 0 || !isRepeat) {
            imgArr.push(url);
            matter.push({
              type: matterMap.get(result.data.result_type),
              imgSrc: imgArr,
            });
          }
          message.success(file.name + '分类成功！');
          setStatus('finish');
        }
      });
      setMatterArr(matter);
      return;
    }
    if (values.filelist.length && values.filelist[0].thumbUrl) {
      const imgURL = values.filelist[0].thumbUrl;
      const reg = /.+(base64,)/;
      //需要对url进行解码
      const image = encodeURIComponent(imgURL.replace(reg, ''));
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
  const handleUpload = async () => {
    if (props.type === 'matter') {
      setImgVisible(true);
      return;
    }
    const baike_info = lineData[0]?.baike_info;
    const uploadParam = {
      name: lineData[0]?.name,
      img_url: baike_info.image_url,
      baike_url: baike_info.baike_url,
      description: baike_info.description.slice(0, 200),
      square: currentUser.square,
      type: props.type,
      status: '已入库',
    };
    await uploadHistory(uploadParam).then((res) => {
      if (res.code === 0) {
        message.success(res.message);
        setState('');
        setLineData('');
        tableRef.current.reload();
      } else {
        message.error(res.message);
      }
    });
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
            <ProForm
              submitter={{
                searchConfig: {
                  submitText: '提交',
                  resetText: props.type === 'matter' ? '查看分类详情' : '上传历史记录',
                },
                resetButtonProps: {
                  style: {
                    // 隐藏重置按钮
                    display: status === 'finish' ? '' : 'none',
                  },
                },
              }}
              onFinish={getResult}
              onReset={handleUpload}
            >
              <ProFormUploadButton
                name="filelist"
                action="v2/5cc8019d300000980a055e76"
                listType="picture-card"
                max={props.type === 'matter' ? 10 : 1}
                fileList={fileList}
                fieldProps={{
                  onPreview: handlePreview,
                  multiple: props.type === 'matter' ? true : false,
                }}
                onChange={handleChange}
              />
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
          {matterArr &&
            matterArr.map((item, index) => {
              if (Array.isArray(item.imgSrc)) {
                return (
                  <>
                    {imgVisible && (
                      <Row gutter={[16, 16]}>
                        <Divider orientation="left">{item.type}</Divider>

                        <Col span={24}>
                          <Image.PreviewGroup
                            preview={{ imgVisible, onVisibleChange: (vis) => setImgVisible(vis) }}
                          >
                            {item.imgSrc.map((sonItem, index) => {
                              console.log(sonItem, 'item');

                              return <Image width={300} key={item.type} src={sonItem} />;
                            })}
                          </Image.PreviewGroup>
                        </Col>
                      </Row>
                    )}
                  </>
                );
              }
              return (
                <>
                  {imgVisible && (
                    <Row key={item.type} gutter={[16, 16]}>
                      <Col span={24 / matterArr.length}>
                        <Divider orientation="left">{item.type}</Divider>
                        <Image width={300} key={item.type} src={item.imgSrc} />
                      </Col>
                    </Row>
                  )}
                </>
              );
            })}
          <SmileTwoTone /> I <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Card>
      <Card title="分类历史">
        <ProTable
          actionRef={tableRef}
          columns={columns}
          options={false}
          // rowSelection={{
          //   // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          //   // 注释该行则默认不显示下拉选项
          //   selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          //   defaultSelectedRowKeys: [1],
          // }}
          rowKey="key"
          // toolBarRender={() => [<Button key="show">记录入库</Button>]}
          request={async (
            // 第一个参数 params 查询表单和 params 参数的结合
            // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
            params,
            sort,
            filter,
          ) => {
            // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
            // 如果需要转化参数可以在这里进行修改
            const msg = await rule({ ...params, type: props.type });
            return {
              data: msg.data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: msg.total,
            };
          }}
        />
      </Card>
    </>
  );
};

export default CategoryCompoment;
