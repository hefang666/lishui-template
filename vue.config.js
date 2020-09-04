module.exports = {
    runtimeCompiler: true,
    publicPath: './', // 设置打包文件相对路径
    devServer: {
        port: 8080,
        open: true, // 配置自动启动浏览器 
        proxy: {
            '/api': {
                target: 'http://192.168.9.44:9090', // 接口地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "development") {
            config.devtool = "eval-source-map";
        }
    },
    css: {
        sourceMap: true
    }
};