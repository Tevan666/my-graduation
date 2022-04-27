// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 发送验证码 POST /api/login/captcha */

export async function getEmailCode(params) {
  return request('/api/send', {
    method: 'GET',
    params: { email: encodeURIComponent(params.email), code: params.code },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
