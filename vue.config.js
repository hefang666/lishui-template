module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: process.env.NODE_ENV === 'development' ? 'devdist' : 'dist', // 不同的环境打不同包名
  assetsDir: './static',
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
        // target: 'http://221.226.213.42:9090/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
