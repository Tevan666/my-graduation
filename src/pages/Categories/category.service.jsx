import request, { extend } from 'umi-request';

//封装接口，image为解码后的图片，num为百科条数，classifiy为类别
export async function getResults(image, num, classify) {
  return request(
    `/rest/2.0/image-classify/v1/${classify}?access_token=24.0b4f7ca8be363e09a3abc9a35f4d7445.2592000.1655260802.282335-25425850`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: `image=${image}&baike_num=${num}`,
    },
  );
}

/** 上传历史记录 POST /api/upload */

export async function uploadHistory(props) {
  console.log('params', props);
  return request('/api/upload', {
    method: 'POST',
    params: props,
  });
}
