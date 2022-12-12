import { request } from "@/utils/request";

const MODULE_NAME = MODULES.ACCESS_ADMIN;
const URL = MODULE_NAME + "/user";

export function getUsers(params) {
  return request.get(URL, { params: params });
}

export async function updateUser(params) {
  return await request.put(URL, params);
}

export async function saveUser(params) {
  return await request.post(URL, params);
}

export async function deleteUserById(id) {
  return await request.delete(URL, { params: { id: id } });
}

export async function deleteUsersByIdInBatch(ids) {
  return await request.delete(URL + "/batch", { params: { ids: ids } });
}
