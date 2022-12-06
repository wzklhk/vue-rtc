// 需要在index.html中引入js
// eslint的globals中需添加变量否则会报红
// eslint-disable-next-line no-unused-vars
let ip = "127.0.0.1";
let port = 23333;

const CONFIG = {
  // url: "https://" + ip + ":" + port + "/",  // 指定后端url
  // url: "/",  // 使用网关url作为后端url，生产环境，不加api反向代理转发
  url: "/api",  // 使用网关url作为后端url，开发环境，加api反向代理转发

  wsUrl: "wss://" + ip + ":" + port + "/",
};

const MODULES = {
  ACCESS_ADMIN: "access-admin",
  SERVICE_RTC: "service-rtc",
};
