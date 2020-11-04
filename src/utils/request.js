import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { api } from '@/api/api'
// import { getToken } from '@/utils/auth'

//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// create an axios instance
const service = axios.create({
    baseURL: api, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // if (store.getters.token) {
        //     // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //     config.headers['Authorization'] = getToken
        // }

        // 获取token
        // let token = ''
        // if (!localStorage.getItem('token')) {
        //     token = store.getters.token
        // } else {
        //     token = localStorage.getItem('token')
        // }
        // config.headers['Authorization'] = `Bearer ${token}`;

        config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwMjk0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik5KTFMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsi5rqn5rC05pm65oWn5rC05Yqh566h55CG5ZGY6KeS6ImyIiwi6K6_5a6i54K5566h55CG6KeS6ImyIl0sImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjEwMTU5IiwiVXNlck5hbWUiOiJOSkxTIiwiT3JnSWQiOiIxMDI5NCIsIlRydWVOYW1lIjoi5rqn5rC05pm65oWn5rC05Yqh566h55CG5ZGY55So5oi3IiwiQXZhdGVyIjoiIiwiT3JnTmFtZSI6Iua6p-awtOaZuuaFp-awtOWKoSIsIlRlbmFudE5hbWUiOiLmuqfmsLTmmbrmhafmsLTliqEiLCJUZW5hbnRDb25uZWN0U3RyaW5nIjoiIiwiUm9sZXMiOiIxNjMxODIsMTYzMTg0Iiwic3ViIjoiMTAyOTQiLCJqdGkiOiI2NmViZTdkMS1hZmQyLTQ2MmMtOGJjYS1iNTQzZGI3ZTEwYmQiLCJpYXQiOjE2MDQ0NTQ4OTgsIm5iZiI6MTYwNDQ1NDg5OCwiZXhwIjoxNjA0NDk4MDk4LCJpc3MiOiJTbnRTb2Z0IiwiYXVkIjoiU250U29mdCJ9.tuRMst4gDghjLma8IGY8-oB0aPp_0VCxpc7ixVWUerI'
            // console.log(config)
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
        const res = response.data
        if (res.code !== 1) {
            // debugger
            if (!res.code) {
                // console.log('111')
            } else {
                Message({
                    message: res.message || 'error',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            // debugger
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (+res.code === -4 || res.code === 50012 || res.code === 50014) {
                // 请自行在引入 MessageBox
                // import { Message, MessageBox } from 'element-ui'
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.resolve(res || 'error')
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
            // Message({
            //     message: error.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        return Promise.reject(error.message)
    }
)

export default service