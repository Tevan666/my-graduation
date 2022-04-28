import { request } from 'umi';

/** 绑定邮箱/手机号等 PUT /api/bind */

export async function bindEmail(options) {
  return request('/api/bind', {
    method: 'PUT',
    params: options,
  });
}

/** 修改用户资料 POST /api/user_info */

export async function updateUser() {
  return request('/api/user_info', {
    method: 'POST',
  });
}

/** 删除用户 DELETE /api/user_info */

export async function deleteUser() {
  return request('/api/user_info', {
    method: 'DELETE',
  });
}
