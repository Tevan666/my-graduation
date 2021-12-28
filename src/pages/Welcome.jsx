import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import { Carousel } from 'antd';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome = () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="Advanced Form" />{' '}
          <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
        </Typography.Text>
        <CodePreview>
          图像分类，就是已有固定的分类标签集合，然后对于输入的图像，从分类标签集合中找出一个分类标签，最后把分类标签分配给该输入图像。
        </CodePreview>
      </Card>
      <Carousel autoplay arrows={true} className={styles.imgBox} effect="fade">
        <div>
          <img className={styles.imgStyle} src={require('@/assets/bird.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/book.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/butterfly.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/chicken.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/elephant.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/niu.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/phone.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/shoes.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/songshu.png')} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={require('@/assets/watch.png')} alt="" />
        </div>
      </Carousel>
      ,
    </PageContainer>
  );
};

export default Welcome;
