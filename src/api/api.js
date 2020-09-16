// 根据开发环境或者生产环境判断使用的地址  地址不定
const api = 'http://192.168.9.44:9090/';
// process.env.NODE_ENV == 'development'
//   ? 'http://192.168.9.101:3000/mock/105/'
//   : 'http://192.168.9.44:9090/';

export {api};
