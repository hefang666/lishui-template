import axios from 'axios';
import {Message} from 'element-ui';

// import {api} from '@/api/api';

//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// create an axios instance
const service = axios.create({
  // baseURL: api + 'api/services/Inspection/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = 'hjkj';
    // }

    config.headers['Authorization'] ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwMjk0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik5KTFMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsi5rqn5rC05pm65oWn5rC05Yqh566h55CG5ZGY6KeS6ImyIiwi6K6_5a6i54K5566h55CG6KeS6ImyIl0sImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjEwMTU5IiwiVXNlck5hbWUiOiJOSkxTIiwiT3JnSWQiOiIxMDI5NCIsIlRydWVOYW1lIjoi5rqn5rC05pm65oWn5rC05Yqh566h55CG5ZGY55So5oi3IiwiQXZhdGVyIjoiIiwiT3JnTmFtZSI6Iua6p-awtOaZuuaFp-awtOWKoSIsIlRlbmFudE5hbWUiOiLmuqfmsLTmmbrmhafmsLTliqEiLCJUZW5hbnRDb25uZWN0U3RyaW5nIjoiIiwiUm9sZXMiOiIxNjMxODIsMTYzMTg0Iiwic3ViIjoiMTAyOTQiLCJqdGkiOiJlZjBkNzcxNy0zMWEwLTRmOTgtYjkyMC00OGRlNTI5YjY1NzAiLCJpYXQiOjE2MDA4MjI5NzIsIm5iZiI6MTYwMDgyMjk3MiwiZXhwIjoxNjAwODY2MTcyLCJpc3MiOiJTbnRTb2Z0IiwiYXVkIjoiU250U29mdCJ9.zp5F7A3o04yi2Xt0qLDUnd_9vAHTM3Sgd4wuZ1_aX6E";

    // console.log(config);
    return config;
  },
  error => {
    // do something with request error
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

    // if the custom code is not 20000, it is judged as an error.
    if (!res.success) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
    }
    return res;
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
