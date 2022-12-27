import { request } from "@/utils/request";

const IP = "localhost";
const PORT = "1985";

const URL = "http://" + IP + ":" + PORT + "/api/v1";
const RTC_URL = "http://" + IP + ":" + PORT + "/rtc/v1";

export async function getVersions() {
  return await request.get(URL + "/versions");
}

export async function getVhosts() {
  return await request.get(URL + "/vhost");
}

export async function getVhost(id) {
  return await request.get(URL + "/vhost" + id);
}

export async function getStreams() {
  return await request.get(URL + "/streams");
}

export async function getStream(id) {
  return await request.get(URL + "/streams" + id);
}

export async function getClients() {
  return await request.get(URL + "/clients");
}

export async function getClient(id) {
  return await request.get(URL + "/clients" + id);
}

export async function publish(streamUrl, sdp) {
  let url = RTC_URL + "/publish";
  return await request.post(url, {
    api: url,
    streamurl: streamUrl,
    sdp: sdp,
  });
}

export async function play(streamUrl, sdp) {
  let url = RTC_URL + "/play";
  return await request.post(url, {
    api: url,
    streamurl: streamUrl,
    sdp: sdp,
  });
}
