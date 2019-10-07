/**
 * Created by Asimple on 2019/9/28.
 */
import axios from 'axios'
import router from '../router'

const baseUrl = 'http://localhost:8080/video';

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  var message = '';
  switch (error.response.status) {
    case 401:
      message: '授权错误';
      router.push({path: '/'});
      break;
    default :
      message: '系统错误';
      router.push({path: '/error'});
      break;
  }
  Notification({
    title: '出错了',
    type: error,
    message: message
  });
  return Promise.reject(error);
});

export const getIndexData = params => {
  const url = baseUrl + '/index';
  return axios.post(url, params);
};

