import { request } from "@/utils/request";

const MODULE_NAME = MODULES.SERVICE_RTC;
const URL = MODULE_NAME + "/ws";

export async function getWsUrl() {
  return await request.get(URL + "/getUrl");
}

export async function getConnectedUserList() {
  return await request.get(URL + "/getConnectedUserList");
}

export function getWssUrl() {
  return CONFIG.WS_URL + URL;
}
