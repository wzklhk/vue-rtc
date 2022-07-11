// 需要在index.html中引入js
// eslint的globals中需添加变量否则会报红
// eslint-disable-next-line no-unused-vars
let ip = "127.0.0.1";
let port = 23333;

const CONFIG = {
  url: "https://" + ip + ":" + port + "/",
  wsUrl: "wss://" + ip + ":" + port + "/",
};

const MODULES = {
  jpa: "jpa",
  im: "im",
};
