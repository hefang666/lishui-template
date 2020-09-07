import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// create an axios instance
const service = axios.create({
    baseURL: '/v1', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // if (store.getters.token) {
        //     // let each request carry token
        //     // ['X-Token'] is a custom headers key
        //     // please modify it according to the actual situation
        //     // config.headers['X-Token'] = getToken()

        // }
        config.headers['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwMjk0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik5KTFMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiLmuqfmsLTmmbrmhafmsLTliqHnrqHnkIblkZjop5LoibIiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxMDE1OSIsIlVzZXJOYW1lIjoiTkpMUyIsIk9yZ0lkIjoiMTAyOTQiLCJUcnVlTmFtZSI6Iua6p-awtOaZuuaFp-awtOWKoeeuoeeQhuWRmOeUqOaItyIsIkF2YXRlciI6IiIsIk9yZ05hbWUiOiLmuqfmsLTmmbrmhafmsLTliqEiLCJUZW5hbnROYW1lIjoi5rqn5rC05pm65oWn5rC05YqhIiwiVGVuYW50Q29ubmVjdFN0cmluZyI6IiIsIlJvbGVzIjoiMTYzMTgyIiwic3ViIjoiMTAyOTQiLCJqdGkiOiIwNTgxZDY5NS1lNTUxLTRiYTItYThiZi1lODQxY2VlZjE1OWUiLCJpYXQiOjE1OTk0NjgyNzEsIm5iZiI6MTU5OTQ2ODI3MSwiZXhwIjoxNTk5NTExNDcxLCJpc3MiOiJTbnRTb2Z0IiwiYXVkIjoiU250U29mdCJ9.wHs750RTEst8ahVXqcD44RU1seo07ZBxYRzQBHMVE4s"
            // config.headers['aa'] = 'aa'
            // console.log(config)
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

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
            // debugger

        if (res.code !== 1) {
            // debugger
            if (!res.code) {
                // console.log('00000000000000')
                // debugger
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
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service