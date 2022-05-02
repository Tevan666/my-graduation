import ProForm, { ModalForm, ProFormText, ProFormCaptcha } from '@ant-design/pro-form';

import { LockOutlined, BarcodeOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'umi';
import { getEmailCode, updatePassword } from '@/services/ant-design-pro/login';
import styles from '../../../pages/user/Login/index.less';
import { useState } from 'react';
import { Alert, message, Tabs } from 'antd';

const RegisterModal = ({ visible, setModalVisit }) => {
  const [type, setType] = useState('mobile');
  const intl = useIntl();
  return (
    <>
      <ModalForm
        destroyonclose
        width={600}
        title="注册新账号"
        visible={visible}
        onFinish={async (values) => {
          console.log(values, 'values');
          await updatePassword(values).then((res) => {
            if (res.code === 0) {
              message.success(res.message);
              return true;
            } else {
              message.error(res.message);
            }
          });
          // return true;
        }}
        onVisibleChange={setModalVisit}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="mobile"
            tab={intl.formatMessage({
              id: 'pages.login.phoneRegister.tab',
              defaultMessage: '手机号注册',
            })}
          />
          <Tabs.TabPane
            key="email"
            tab={intl.formatMessage({
              id: 'pages.login.accountRegister.tab',
              defaultMessage: '邮箱注册',
            })}
          />
        </Tabs>
        <ProFormText
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
          width="sm"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
        />
        {type != 'mobile' ? (
          <ProFormText
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
            width="sm"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
          />
        ) : (
          <ProFormText
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
            width="sm"
            name="mobile"
            label="手机号"
            placeholder="请输入手机号"
          />
        )}
        {type === 'email' && (
          <ProFormCaptcha
            label="验证码"
            width="sm"
            fieldProps={{
              size: 'large',
              prefix: <BarcodeOutlined className={styles.prefixIcon} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.captcha.placeholder',
              defaultMessage: '请输入验证码',
            })}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${intl.formatMessage({
                  id: 'pages.getCaptchaSecondText',
                  defaultMessage: '获取验证码',
                })}`;
              }

              return intl.formatMessage({
                id: 'pages.login.phoneLogin.getVerificationCode',
                defaultMessage: '获取验证码',
              });
            }}
            phoneName="email"
            name="code"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.captcha.required"
                    defaultMessage="请输入验证码！"
                  />
                ),
              },
            ]}
            onGetCaptcha={async (email) => {
              const result = await getEmailCode({
                email: email,
                type: 'update',
              });

              if (result.code != 0) {
                message.error('邮件发送失败，请稍后再试');
                return;
              }

              message.success('获取验证码成功！');
            }}
          />
        )}
        <ProFormText.Password
          label="设置密码"
          width="sm"
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.password.placeholder',
            defaultMessage: '请输入新密码',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.password.required"
                  defaultMessage="请输入新密码！"
                />
              ),
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default RegisterModal;
