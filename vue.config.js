module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map';
    }
  },
  css: {
    sourceMap: true
  },
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.9.44:9090/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
