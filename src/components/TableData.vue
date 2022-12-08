<template>
  <div>
    <el-button @click="getJsonPlaceHolder1">json1</el-button>
    <el-button @click="getUsers({ pageNum: currentPage, pageSize: currentPageSize })">getUsers</el-button>
    <el-button @click="postRandomUsers">randomSavePostUsers</el-button>
    <el-button @click="putUsers">putUsers</el-button>
    <el-button @click="deleteData">deleteData</el-button>
    <el-button @click="random">选择</el-button>

    <el-table ref="multipleTable" :data="tableData" class="data-table" style="width: 100%">
      <el-table-column type="selection" show-overflow-tooltip @selection-change="handleSelectionChange" />
      <el-table-column label="id" prop="id" sortable />
      <el-table-column label="username" prop="username" sortable />
      <el-table-column label="password" prop="password" sortable />
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="currentPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import { deleteUser, getUsers, saveUser, updateUser } from "@/api/access/admin/user";
import { randInt, randStr } from "@/utils/utils";

export default {
  name: "TableData",
  props: {},
  created() {
    this.getUsers({ pageNum: this.currentPage, pageSize: this.currentPageSize });
  },
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      currentPageSize: 10,
      multipleSelection: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPageSize = val;
      this.getUsers({ pageNum: this.currentPage, pageSize: this.currentPageSize });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getUsers({ pageNum: this.currentPage, pageSize: this.currentPageSize });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getJsonPlaceHolder1() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
        let data = response.data;
        data = data.concat(data).concat(data).concat(data).concat(data);
        console.log(data);
        console.log(typeof data);
        this.tableData = data;
      });
    },
    async getUsers(params) {
      let response = await getUsers(params);
      // console.log(["response context", response]);

      if (response.code === ERROR_CODE.OK) {
        // this.$message.success(response.msg);
        console.log(response.data.list);
        this.tableData = response.data.list;
        this.total = response.data.total;
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
    random() {
      console.log(randStr(randInt(16, 20)));
    },
  },
};
</script>

<style scoped></style>