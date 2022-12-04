import axios from "axios";
import Vue from "vue";

let url = CONFIG.url;

const request = axios.create({
  baseURL: url,
  // baseURL: "/api",
  timeout: 1000 * 5,
});

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    config.headers.Authorization = sessionStorage.getItem("Authorization");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    let { status, data } = response || {};

    if (status === 200) {
      if (data.code === 0) {
        return data;
      }
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

Vue.prototype.$request = request;

export default request;
