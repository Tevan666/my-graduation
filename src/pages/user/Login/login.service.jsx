import request, { extend } from 'umi-request';

export async function getImgSrc() {
  return request(`/api/common/graph_capture`, {
    method: 'GET',
    responseType: 'blob',
  }).then((res) => {
    let blob = new Blob([res], { type: 'img/jpeg' });
    let url = window.URL.createObjectURL(blob);
    console.log(blob, 'url111');
    return url;
  });
}
