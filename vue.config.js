module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "eval-source-map";
    }
  },
  css: {
    sourceMap: true
  }
};
