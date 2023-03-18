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
  const imgUrl = [
    { name: 'bird', url: bird },
    { name: 'book', url: book },
    { name: 'butterfly', url: butterfly },
    { name: 'chicken', url: chicken },
    { name: 'elephant', url: elephant },
    { name: 'niu', url: niu },
    { name: 'phone', url: phone },
    { name: 'shoes', url: shoes },
    { name: 'songshu', url: songshu },
    { name: 'watch', url: watch },
  ];
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
        {imgUrl.map((item) => {
          return (
            <div key={item.name}>
              <img className={styles.imgStyle} src={item.url} alt={item.url} />
            </div>
          );
        })}
      </Carousel>
    </PageContainer>
  );
};

export default Welcome;
