import { request } from "@/utils/request";

const MODULE_NAME = MODULES.SERVICE_RTC;
const URL = MODULE_NAME + "/srs";
// const URL = "/srs";

let srsAddr = "1.12.237.101";
let srsPort = "1985";

export async function getVersions() {
  return await request.get(URL + "/versions");
}

export async function getVhosts() {
  return await request.get(URL + "/vhost");
}

export async function getVhost(id) {
  return await request.get(URL + "/vhost/" + id);
}

export async function getStreams() {
  return await request.get(URL + "/streams");
}

export async function getStream(id) {
  return await request.get(URL + "/streams/" + id);
}

export async function getClients() {
  return await request.get(URL + "/clients");
}

export async function getClient(id) {
  return await request.get(URL + "/clients/" + id);
}

export async function publish(streamUrl, sdp) {
  let url = URL + "/publish";
  return await request.post(url, {
    streamurl: streamUrl,
    sdp: sdp,
  });
}

export async function publishByRoomAndDisplay(room, display, sdp) {
  let url = URL + "/publish";
  return await request.post(url, {
    room: room,
    display: display,
    sdp: sdp,
  });
}

export async function publishBySrs(room, display, sdp) {
  let url = "http://" + srsAddr + ":" + srsPort + "/rtc/v1/publish";
  return await request.post(url, {
    api: url,
    streamurl: "webrtc://" + srsAddr + "/" + room + "/" + display + "?secret=2b78f7b7b4244a598decc2c040a665f3",
    sdp: sdp,
  });
}

export async function play(streamUrl, sdp) {
  let url = URL + "/play";
  return await request.post(url, {
    streamurl: streamUrl,
    sdp: sdp,
  });
}

export async function playByRoomAndDisplay(room, display, sdp) {
  let url = URL + "/play";
  return await request.post(url, {
    room: room,
    display: display,
    sdp: sdp,
  });
}

export async function playBySrs(room, display, sdp) {
  let url = "http://" + srsAddr + ":" + srsPort + "/rtc/v1/play";
  return await request.post(url, {
    api: url,
    streamurl: "webrtc://" + srsAddr + "/" + room + "/" + display,
    sdp: sdp,
  });
}
