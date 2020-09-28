module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "eval-source-map";
    }
  },
  devServer: {
    proxy: {
        '/': {     //这里最好有一个 /
            target: 'http://192.168.9.44:9090/api/',  // 后台接口域名
            ws: true,        //如果要代理 websockets，配置这个参数
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
        }
    }
  },
  css: {
    sourceMap: true
  }
};
