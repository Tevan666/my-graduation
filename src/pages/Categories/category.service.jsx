import request, { extend } from 'umi-request';

const baseRequest = extend({
  prefix: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/',
  params: {
    access_token: '24.ba42db818351143b0b0808785d427fa8.2592000.1643275108.282335-25425850',
  },
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
});

export default baseRequest;
