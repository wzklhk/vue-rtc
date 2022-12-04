import request from "@/api/request";

const MODULE_NAME = MODULES.SERVICE_RTC;

async function getWsUrl() {
  return await request.get(MODULE_NAME + "/ws/getUrl");
}

async function getConnectedUserList() {
  return await request.get(MODULE_NAME + "/ws/getConnectedUserList");
}

function getWssUrl() {
  return CONFIG.wsUrl + MODULE_NAME + "/ws";
}

export { getWsUrl, getConnectedUserList, getWssUrl };
