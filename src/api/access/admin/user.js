import { request } from "@/utils/request";

const MODULE_NAME = MODULES.ACCESS_ADMIN;
const URL = MODULE_NAME + "/user";

export async function getUsers(params) {
  return await request.get(URL, params);
}

export async function updateUser(params) {
  return await request.put(URL, params);
}

export async function saveUser(params) {
  return await request.post(URL, params);
}

export async function deleteUser(params) {
  return await request.delete(URL, params);
}
