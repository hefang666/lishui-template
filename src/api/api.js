// 根据开发环境或者生产环境判断使用的地址
let apis = 'http://192.168.9.44:9090'
let apiUrl = window.apiUrl
if (apiUrl) {
    apis = apiUrl.substring(0, apiUrl.length - 1)
}
const api = process.env.NODE_ENV == 'development' ?
    // 'http://221.226.213.42:9090' :
    // 'http://221.226.213.42:9090';
    'http://192.168.9.44:9090' : apis;


export { api };

// const api = process.env.NODE_ENV == 'development' ?
//     // 'http://221.226.213.42:9090' :
//     // 'http://221.226.213.42:9090';
//     'http://192.168.9.44:9090' : 'http://192.168.9.44:9090';

// export { api };