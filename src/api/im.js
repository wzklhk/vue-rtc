import request from "@/api/request";

const MODULE_NAME = MODULES.im;

async function getWsUrl() {
  return await request.get(MODULE_NAME + "/ws/getUrl");
}

function getWssUrl() {
  return CONFIG.wsUrl + MODULE_NAME + "/ws";
}

export { getWsUrl, getWssUrl };
