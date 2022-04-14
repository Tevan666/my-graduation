import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { Route } from 'react-router-dom';
import Animal from './Categories/Animal';
import Category from './Categories/Category';
import Plant from './Categories/Plant';

const Admin = () => {
  const intl = useIntl();
  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This page can only be viewed by admin',
      })}
    >
      <Route path="/admin/animal" component={Animal} />
      <Route path="/admin/plant" component={Plant} />

      <Route path="/admin/category" component={Category} />
    </PageHeaderWrapper>
  );
};

export default Admin;
