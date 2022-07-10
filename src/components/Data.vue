<template>
  <div>
    <el-button @click="getJsonPlaceHolder1">json1</el-button>
    <el-button @click="getJsonPlaceHolder2">json2</el-button>
    <el-button @click="getData1">getData1</el-button>
    <el-button @click="getDataById">getDataByIdLog</el-button>
    <el-button @click="postData">postData</el-button>
    <el-button @click="deleteData">deleteData</el-button>

    <el-table :data="tableData" class="data-table">
      <el-table-column label="id" prop="id" />
      <el-table-column label="name" prop="name" />
      <el-table-column label="email" prop="email" />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { deleteUserById, getUserById, getUserList, saveUser } from "@/api/jpa";

export default {
  name: "Data",
  created() {
    this.getData1();
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
    getJsonPlaceHolder2() {
      this.$request.get("http://127.0.0.1:21010/jpa-gosuncn/user/list").then((response) => {
        console.log(response);
      });
    },
    async getData1() {
      let data = await getUserList();
      console.log(data);
      this.tableData = data.data;
    },
    getData2() {
      this.request.get("https://127.0.0.1:21010/jpa-surface/user/list").then((res) => {
        let data = res.data;
        console.log(res);
        this.tableData = data;
      });
    },
    async getDataById() {
      console.log(await getUserById(1));
    },
    async postData() {
      let data = await saveUser({
        name: "wkh",
        email: "wkh@wkh.wkh",
        age: 22,
      });
      console.log(data);
    },
    deleteData() {
      console.log(deleteUserById(29));
    },
  },
};
</script>

<style scoped></style>