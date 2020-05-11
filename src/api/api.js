/**
 * Created by Asimple on 2019/9/28.
 */
import axios from 'axios'
import router from '../router'
import Qs from 'qs'
import { Message } from 'element-ui';

const baseUrl = 'http://localhost:8080/video';
const baseProfileUrl = baseUrl+'/profile';
const baseXlUrl = baseUrl+'/xl';
const baseManagerUrl = baseUrl+'/admin';
const $message = Message;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  let message = '';
  switch (error.response.status) {
    case 401:
      message = '授权错误';
      router.push({path: '/'});
      break;
    default :
      message = '系统错误';
      router.push({path: '/error'});
      break;
  }
  Notification(new {
    title: '出错了',
    type: error,
    message: message
  });
  return Promise.reject(error);
});

export const errorDeal = err => {
  this.$message.error({
    message: '系统调用失败,请重试!',
    duration: 3000,
  });
};

export const getIndexData = params => {
  const url = baseUrl + '/index';
  return axios.post(url, params);
};

export const dealResult = data => {
  const code = data.code;
  if( '000000'===code ) {
    return data.data;
  } else {
    $message.error({
      message: data.message,
      duration: 2000,
    });
    return null;
  }
};

export const dealResultWithoutData = data => {
  const code = data.code;
  if( '000000'===code ) {
    $message.success(data.message);
    return true;
  } else {
    $message.error({
      message: data.message,
      duration: 2000,
    });
    return false;
  }
};

export const getIndexHeaderInfo = params => {
  const url = baseUrl + '/getHeaderInfo';
  return axios.post(url, params);
};

export const login = params => {
  const url = baseUrl + '/login';
  return axios.post(url, Qs.stringify(params));
};

export const logOut = params => {
  const url = baseUrl + '/logout';
  return axios.post(url, params);
};

export const vipCodeVerification = params => {
  const url = baseUrl + '/vipCodeVerification';
  return axios.post(url, Qs.stringify({'vipCode':params}));
};

export const signUp = params => {
  const url = baseUrl + '/register';
  return axios.post(url, Qs.stringify(params));
};

export const getFilmDetail = params => {
  const url = baseXlUrl + '/detail';
  return axios.post(url, Qs.stringify(params));
};

export const saveRaty = params => {
  const url = baseXlUrl + '/addRaty';
  return axios.post(url, Qs.stringify(params));
};

export const searchFilm = param => {
  const url = baseXlUrl + '/index';
  return axios.post(url, Qs.stringify(param));
};

export const userProfile = param => {
  const url = baseProfileUrl + '/profilePage';
  return axios.post(url, Qs.stringify(param));
};

export const getFilmsForProfile = param => {
  const url = baseProfileUrl + '/getFilmAjax';
  return axios.post(url, Qs.stringify(param));
};

export const getMyComments = param => {
  const url = baseProfileUrl + '/getMyComments';
  return axios.post(url, Qs.stringify(param));
};

export const updatePassword = param => {
  const url = baseUrl + '/updatePassword';
  return axios.post(url, Qs.stringify(param));
};

export const getNotes = params => {
  const url = baseUrl + '/note';
  return axios.post(url, Qs.stringify(params));
};

export const saveComment = params => {
  const url = baseUrl + '/saveComment';
  return axios.post(url, Qs.stringify(params));
};

export const changeLikeNum = params => {
  const url = baseUrl + '/changeLikeNum';
  return axios.post(url, Qs.stringify(params));
};

export const managerFilm = params => {
  const url = baseManagerUrl + '/list';
  return axios.post(url, Qs.stringify(params));
};

export const managerCatalog = params => {
  const url = baseManagerUrl + '/catalog';
  return axios.post(url, Qs.stringify(params));
};

export const addCataLog = params => {
  const url = baseManagerUrl + '/addCataLog';
  return axios.post(url, Qs.stringify(params));
};
