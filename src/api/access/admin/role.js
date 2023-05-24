import { request } from "@/utils/request";

const MODULE_NAME = MODULES.ACCESS_ADMIN;
const URL = MODULE_NAME + "/role";

export function get(params) {
  return request.get(URL, { params: params });
}

export async function update(params) {
  return await request.put(URL, params);
}

export async function save(params) {
  return await request.post(URL, params);
}

export async function deleteById(id) {
  return await request.delete(URL, { params: { id: id } });
}

export async function deleteByIdInBatch(ids) {
  return await request.delete(URL + "/batch", { params: { ids: ids } });
}
