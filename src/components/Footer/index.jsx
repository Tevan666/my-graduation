import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

import BearRun from '../BearRun/index.jsx';
const Footer = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Tevan出品，必是精品',
  });
  const currentYear = new Date().getFullYear();
  return (
    <>
      <BearRun className="max-h-100" />
      <DefaultFooter
        className="z-10 absolute left-1/2 bottom-0 -translate-x-1/2 bg-transparent"
        style={{ transform: 'translate(-50%,0)' }}
        copyright={`${currentYear} ${defaultMessage}`}
        links={[
          {
            key: 'Ant Design Pro',
            title: 'Tevan666',
            href: 'https://tevan666.github.io/vuepress/',
            blankTarget: true,
          },
          {
            key: 'github',
            title: <GithubOutlined />,
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true,
          },
          {
            key: 'Ant Design',
            title: 'Ant Design',
            href: 'https://ant.design',
            blankTarget: true,
          },
        ]}
      />
    </>
  );
};

export default Footer;
