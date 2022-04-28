// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 发送验证码 POST /api/send */

export async function getEmailCode(params) {
  return request('/api/send', {
    method: 'GET',
    params: { email: encodeURI(params.email), type: params.type },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

/** 通过邮箱修改密码 PUT /api/update_password */

export async function updatePassword(params) {
  return request('/api/update_password', {
    method: 'PUT',
    params: { ...params, email: encodeURI(params.email) },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
