import axios from 'axios';
import {MessageBox,Message} from 'element-ui';
import store from '@/store';
import {getToken} from '@/utils/auth';

//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// create an axios instance
// const isDev = process.env.NODE_ENV === 'development';
// // http://192.168.9.176:93/api/services/
// const baseUrl = isDev ? 'http://192.168.9.176:93/api/' : '';

const service = axios.create({
  // baseURL: baseUrl,
  baseURL: '/',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout7
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // if(res.code == 200) {
    //   return Promise.resolve(res)
    // }
    // console.log('res :>> ', res);
    // return Promise.resolve(res);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 获取异常提示信息
    // console.log('----',error.response.data.error.message)
    // console.log('err' + error); // for debug
    Message({
      message: error.response.data.error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
