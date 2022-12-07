<template>
  <div>
    <el-button @click="getJsonPlaceHolder1">json1</el-button>
    <el-button @click="getUsers">getUsers</el-button>
    <el-button @click="postUsers">postUsers</el-button>
    <el-button @click="putUsers">putUsers</el-button>
    <el-button @click="deleteData">deleteData</el-button>

    <el-table :data="tableData" class="data-table">
      <el-table-column label="id" prop="id" />
      <el-table-column label="name" prop="username" />
      <el-table-column label="email" prop="password" />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { deleteUser, getUsers, saveUser, updateUser } from "@/api/access/admin/user";

export default {
  name: "Data",
  created() {
    this.getUsers();
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getJsonPlaceHolder1() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
        let data = response.data;
        data = data.concat(data).concat(data).concat(data).concat(data);
        console.log(data);
        console.log(typeof data);
        this.tableData = data;
      });
    },
    async getUsers() {
      let response = await getUsers();
      console.log(response);

      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
        this.tableData = response.data.list;
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
      } else {
        this.$message.info(response.msg);
      }
    },
    async postUsers() {
      let response = await saveUser({
        username: "user" + parseInt(Math.random() * 10000),
      });
      console.log(response);

      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
      } else {
        this.$message.info(response.msg);
      }
    },
    async putUsers() {
      let response = await updateUser({
        id: 100,
        username: "user" + parseInt(Math.random() * 10000),
      });
      console.log(response);

      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
      } else {
        this.$message.info(response.msg);
      }
    },
    async deleteData() {
      let response = await deleteUser({
        id: 29,
      });
      console.log("response");
      console.log(response);

      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
      } else {
        this.$message.info(response.msg);
      }
    },
  },
};
</script>

<style scoped></style>