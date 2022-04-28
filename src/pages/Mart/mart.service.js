import { request } from 'umi';

/** 获取购买历史 PUT /api/history */

export async function getPurchaseRecord() {
  return request('/api/history', {
    method: 'GET',
  });
}

/** 获取上传历史 PUT /api/history */

export async function getUploadHistory() {
  return request('/api/upload', {
    method: 'GET',
    params: { access: true },
  });
}
