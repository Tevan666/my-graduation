import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { Fragment, useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login, email_login } from '@/services/ant-design-pro/api';
import { getEmailCode } from '@/services/ant-design-pro/login';
import styles from './index.less';
import logoImg from '../../../assets/last.png';

import { Image } from 'antd';

import { getImgSrc } from './login.service';
import { useEffect } from 'react';
const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [codeSrc, setCodeSrc] = useState('');
  const [type, setType] = useState('mobile');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  useEffect(() => {
    getSrc();
  }, []);
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    localStorage.setItem('userId', userInfo.userId);

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const getSrc = async () => {
    await getImgSrc().then((res) => {
      setCodeSrc(res);
    });
  };

  const handleSubmit = async (values) => {
    try {
      // 登录
      console.log(type, 'type');
      const msg =
        type == 'mobile' ? await login({ ...values, type }) : await email_login({ ...values });
      if (msg.code === 0) {
        localStorage.setItem('token', msg.token);
        message.success('登录成功！');
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        history.push('/welcome');
        return;
      } else if (msg.message) {
        message.error(msg.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginImg}>
          <img src={logoImg} alt="" />
        </div>
        <div className={styles.content}>
          <div className={styles.lang} data-lang>
            {SelectLang && <SelectLang />}
          </div>
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="基于react和flask搭建的物体分类可视化平台"
            subTitle={intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
            initialValues={{
              autoLogin: true,
            }}
            actions={[
              <FormattedMessage
                key="loginWith"
                id="pages.login.loginWith"
                defaultMessage="其他登录方式"
              />,
              <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
              <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
              <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
            ]}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="mobile"
                tab={intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '手机号登录',
                })}
              />
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '邮箱登录',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误(admin/ant.design)',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="login_email"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '请输入邮箱号',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入邮箱号!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
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
                  phoneName="login_email"
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
                      type: 'login',
                    });

                    if (result.code != 0) {
                      message.error('邮件发送失败，请稍后再试');
                      return;
                    }

                    message.success('获取验证码成功！');
                  }}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="phone"
                  placeholder={intl.formatMessage({
                    id: 'pages.login.phoneNumber.placeholder',
                    defaultMessage: '手机号',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="请输入手机号！"
                        />
                      ),
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="手机号格式错误！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码: ant.design',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText
                  name="code"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.code.placeholder',
                    defaultMessage: '请输入验证码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.code.required"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                />
                <Image src={codeSrc} preview={false} width={200} onClick={getSrc} />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div>
            <Footer />
          </LoginForm>
        </div>
      </div>
    </>
  );
};

export default Login;
