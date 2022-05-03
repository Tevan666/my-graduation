import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import { Carousel } from 'antd';
import bird from '@/assets/bird.png';
import book from '@/assets/book.png';
import butterfly from '@/assets/butterfly.png';
import chicken from '@/assets/chicken.png';
import elephant from '@/assets/elephant.png';
import niu from '@/assets/niu.png';
import phone from '@/assets/phone.png';
import shoes from '@/assets/shoes.png';
import songshu from '@/assets/songshu.png';
import watch from '@/assets/watch.png';

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
            defaultMessage: '目前支持：动物分类、植物分类、物体分类、目标追踪等等特色功能',
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
          <img className={styles.imgStyle} src={bird} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={book} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={butterfly} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={chicken} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={elephant} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={niu} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={phone} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={shoes} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={songshu} alt="" />
        </div>
        <div>
          <img className={styles.imgStyle} src={watch} alt="" />
        </div>
      </Carousel>
    </PageContainer>
  );
};

export default Welcome;
