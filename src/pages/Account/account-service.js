import { request } from 'umi';

/** 绑定邮箱/手机号等 PUT /api/bind */

export async function bindEmail(options) {
  return request('/api/bind', {
    method: 'PUT',
    params: options,
  });
}
