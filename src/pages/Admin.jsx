import React, { useEffect, useState } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
      <Route path="/admin/category" component={Category} />
      <Route path="/admin/plant" component={Plant} />
    </PageHeaderWrapper>
  );
};

export default Admin;
