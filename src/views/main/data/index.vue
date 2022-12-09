<template>
  <div>
    <el-button @click="getUsers()">查询</el-button>
    <page-table :columns="columns" :data="pageData" />
  </div>
</template>

<script>
import PageTable from "@/components/common/PageTable.vue";
import { deleteUser, getUsers, saveUser, updateUser } from "@/api/access/admin/user";
import { randInt, randStr } from "@/utils/utils";

export default {
  name: "DataView",
  components: {
    PageTable,
  },
  data() {
    return {
      columns: [
        {
          label: "user id",
          prop: "id",
          sortable: true,
        },
        {
          label: "用户名",
          prop: "username",
          sortable: true,
        },
        {
          label: "密码",
          prop: "password",
          sortable: true,
        },
      ],
      pageData: {},
      showIndex: false,
      showSelection: false,
    };
  },
  methods: {
    async getUsers(params) {
      let response = await getUsers(params);
      // console.log(["response context", response]);

      if (response.code === ERROR_CODE.OK) {
        // this.$message.success(response.msg);
        console.log(response.data);
        this.pageData = response.data;
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
      } else {
        this.$message.info(response.msg);
      }
    },
    async postRandomUsers() {
      let response = await saveUser({
        username: randStr(randInt(8, 10)),
        password: randStr(randInt(16, 20)),
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
