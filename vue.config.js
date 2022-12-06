let targetUrl = "https://127.0.0.1:23333";

module.exports = {
  devServer: {
    port: 8088,
    https: true,
    proxy: {
      "/api/": {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
