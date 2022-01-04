import request, { extend } from 'umi-request';

export async function getResults(image, num) {
  return request(
    '/rest/2.0/image-classify/v1/animal?access_token=24.ba42db818351143b0b0808785d427fa8.2592000.1643275108.282335-25425850',
    {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: `image=${image}&baike_num=${num}`,
    },
  );
}
