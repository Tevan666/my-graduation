import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, message, Image, Upload, Button, Skeleton } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { autoSearch, uploadVideo, startTrack, getVideo } from './function.service';
import { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import detectGIF from '../../assets/detect.gif';
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {},
};

const Function = () => {
  const [codeSrc, setCodeSrc] = useState('');
  const [beginCheck, setBeginTrack] = useState(false);
  const [hasVideo, setHasvideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleRPAsearch = async (name) => {
    await autoSearch(name).then((res) => {
      setCodeSrc(res);
      if (res) {
        message.success('自动检索及截图成功');
      }
    });
  };
  const handleUploadVideo = async (file) => {
    await uploadVideo(file).then((res) => {
      if (res.code === 0) {
        message.success(res.message);
        setBeginTrack(true);
      } else {
        message.error(res.message);
      }
    });
  };
  const handleStartTrack = async () => {
    setLoading(true);
    await startTrack().then((res) => {
      if (res.code === 0) {
        message.success('成功生成检测视频');
        setLoading(false);
        setHasvideo(true);
      }
    });
  };
  const handleGetVideo = async () => {
    setLoading(true);
    await getVideo().then((res) => {
      setLoading(false);
    });
  };
  return (
    <PageContainer>
      <Card title="功能介绍" bordered="false" style={{ marginBottom: 24 }}>
        <Alert
          message="1.自动检索与截图,自动打开浏览器搜索关键词并截图"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <ProForm title="自动检索及截图" onFinish={handleRPAsearch}>
          <ProFormText
            rules={[{ required: true, message: '请输入需要检索的关键词' }]}
            width="md"
            name="name"
            tooltip="最长为 10 位"
            placeholder="请输入关键词"
            initialValue="物体分类"
          />
        </ProForm>
        {codeSrc && <Image className="mt-4" height={300} src={codeSrc} />}
        <Alert
          message="2.目标跟踪,在视频中定位移动对象的过程。"
          type="success"
          showIcon
          banner
          style={{
            marginTop: 20,
            marginBottom: 48,
          }}
        />
        <Image height={400} src={detectGIF} />
        <Dragger {...props} customRequest={handleUploadVideo}>
          {!beginCheck ? (
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽视频到这里进行上传</p>
            </>
          ) : (
            <Skeleton loading={loading} active avatar>
              {loading ? '点击下方按钮开始追踪吧' : '视频生成成功，点击右下方下载'}
            </Skeleton>
          )}
        </Dragger>
        {beginCheck && (
          <Button className="mt-5" onClick={handleStartTrack} disabled={loading}>
            {loading ? '正在追踪' : '开始追踪'}
          </Button>
        )}
        {hasVideo && (
          <Button className="mt-5 float-right" onClick={handleGetVideo} disabled={loading}>
            获取检测视频
          </Button>
        )}
      </Card>
    </PageContainer>
  );
};

export default Function;
