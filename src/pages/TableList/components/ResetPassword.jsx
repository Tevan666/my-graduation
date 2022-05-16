import ProForm, { ModalForm, ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { message } from 'antd';

import { LockOutlined, BarcodeOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'umi';
import { getEmailCode, updatePassword } from '@/services/ant-design-pro/login';
import styles from '../../../pages/user/Login/index.less';
import { useState } from 'react';
const ResetPassword = ({ visible, setModalVisit }) => {
  const intl = useIntl();
  return (
    <>
      <ModalForm
        destroyonclose
        width={600}
        title="修改密码"
        visible={visible}
        onFinish={async (values) => {
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
        <ProFormText.Password
          label="设置新密码"
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

export default ResetPassword;
