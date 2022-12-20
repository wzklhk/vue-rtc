import { request } from "@/utils/request";

const MODULE_NAME = MODULES.ACCESS_AUTH;
const URL = MODULE_NAME + "/oauth";

export function getToken(username, password) {
  return request.get(URL + "/token", {
    params: {
      grant_type: "password",
      client_id: "client_id",
      client_secret: "client_secret",
      username: username,
      password: password,
    },
  });
}

export function refreshToken(token) {
  return request.get(URL + "/token", {
    params: {
      grant_type: "refresh_token",
      client_id: "client_id",
      client_secret: "client_secret",
      token: token
    },
  });
}

export function checkToken(token) {
  return request.get(URL + "/check_token", {
    params: {
      token: token,
    },
  });
}
