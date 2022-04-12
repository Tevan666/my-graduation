import request, { extend } from 'umi-request';

//封装接口，image为解码后的图片，num为百科条数，classifiy为类别
export async function getResults(image, num, classify) {
  return request(
    `/rest/2.0/image-classify/v1/${classify}?access_token=24.8e5fb3368a1f2bd81c785e7891555807.2592000.1652370565.282335-25425850`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: `image=${image}&baike_num=${num}`,
    },
  );
}
