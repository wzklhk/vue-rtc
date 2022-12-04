import request from "@/api/request";

const MODULE_NAME = MODULES.ACCESS_ADMIN;

async function getUsers(params) {
  return await request.get(MODULE_NAME + "/user", params);
}

async function updateUser(params) {
  return await request.put(MODULE_NAME + "/user", params);
}

async function saveUser(params) {
  return await request.post(MODULE_NAME + "/user", params);
}

async function deleteUserById(id) {
  return await request.delete(MODULE_NAME + "/user/" + id);
}

export { getUsers, updateUser, saveUser, deleteUserById };
