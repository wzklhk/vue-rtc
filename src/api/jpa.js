import request from "@/api/request";

const MODULE_NAME = MODULES.jpa;

async function getUserList(params) {
  return await request.get(MODULE_NAME + "/user/list", params);
}

async function getUserById(id) {
  return await request.get(MODULE_NAME + "/user/" + id);
}

async function saveUser(params) {
  return await request.post(MODULE_NAME + "/user", params);
}

async function deleteUserById(id) {
  return await request.delete(MODULE_NAME + "/user/" + id);
}

export { getUserList, getUserById, saveUser, deleteUserById };
