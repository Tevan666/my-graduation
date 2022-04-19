import request, { extend } from 'umi-request';

export async function getUserUploadRecord(params) {
  return request(`/api/upload`, {
    method: 'GET',
    params,
  });
}
