// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function currentUserInfo(token) {
  return request('/api/user_info', {
    method: 'GET',
    headers: { token: token },
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  return request('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: body,
    ...(options || {}),
  });
}

/** 邮箱登录接口 POST /api/login/account */

export async function email_login(body) {
  return request('/api/email_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...body, login_email: encodeURI(body.login_email) },
  });
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 分页获取上传历史 GET /api/rule */

export async function rule(params, options) {
  return request('/api/upload', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 删除上传历史 DELETE /api/upload */

export async function deleteHistory(id) {
  return request('/api/upload', {
    method: 'DELETE',
    params: id,
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/**
 * 查询各省份使用人数
 *
 *
 */
export async function getMapNum() {
  return request('/api/count', {
    method: 'GET',
  });
}
