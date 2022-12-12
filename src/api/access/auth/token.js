import { request } from "@/utils/request";

const MODULE_NAME = MODULES.ACCESS_AUTH;
const URL = MODULE_NAME + "/oauth";

export function getToken(params) {
  return request.get(URL + "token", {
    params: params,
  });
}

export function checkToken(token) {
  return request.get(URL + "/check_token", {
    params: {
      token: token,
    },
  });
}
