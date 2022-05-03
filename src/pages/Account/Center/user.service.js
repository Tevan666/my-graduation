import request, { extend } from 'umi-request';

export async function getUserUploadRecord(params) {
  return request(`/api/upload`, {
    method: 'GET',
    params,
  });
}

export async function handlereCharge(params) {
  return request(`/api/recharge`, {
    method: 'PUT',
    params,
  });
}
