// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 发送验证码 POST /api/login/captcha */

export async function getEmailCode(params) {
  return request('/api/send', {
    method: 'GET',
    params: { ...params },
  });
}
