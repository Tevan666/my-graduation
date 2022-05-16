import { message } from 'antd';
import { request } from 'umi';

/** RPA自动化 GET /api/welcome */

export async function autoSearch(params) {
  return request('/api/welcome', {
    method: 'GET',
    responseType: 'blob',
    params,
  }).then((res) => {
    let blob = new Blob([res], { type: 'img/jpeg' });
    let url = window.URL.createObjectURL(blob);
    return url;
  });
}

/** 上传视频 POST /api/trackfile */

export async function uploadVideo({ file }) {
  const formData = new FormData();
  formData.append('video', file);
  return request('/api/trackfile', { method: 'post', data: formData, requestType: 'form' });
}

/** 开始检测 POST /api/object_track */

export async function startTrack() {
  return request('/api/object_track', { method: 'post' });
}

/** 开始检测 POST /api/get_video */

export async function getVideo() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/api/get_video');
  xhr.responseType = 'blob';
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
      if ('msSaveOrOpenBlob' in navigator) {
        navigator.msSaveOrOpenBlob(this.response, name);
        return;
      }
      // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
      // const url = URL.createObjectURL(blob);
      const url = URL.createObjectURL(this.response);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'result';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      message.success('下载视频成功');
    }
  };
}
