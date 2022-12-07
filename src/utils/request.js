import axios from "axios";
import store from "@/store";
import { getToken, removeToken } from "@/utils/auth";
import router from "@/router";
import { Message } from "element-ui";

let url = CONFIG.URL;

export const request = axios.create({
  baseURL: url,
  timeout: 1000 * 5,
});

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      console.log();
    }
    config.headers["Authorization"] = getToken();
    config.params = config.params || {};

    return config;
  },
  (error) => {
    console.log("err: " + error); // for debug
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
    console.log("err: " + error); // for debug
    Message.error(error);
    return new Promise((response, reject) => {
      if (error.response) {
        handleTokenExpired();
      }
    });
  }
);

function handleTokenExpired() {
  removeToken();
  sessionStorage.clear();

  router.push("/login");
}
