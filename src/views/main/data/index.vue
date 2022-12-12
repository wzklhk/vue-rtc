<template>
  <div>
    <div>
      <el-button @click="getAllUserByPage()"> 查询</el-button>
      <el-button
        @click="
          postRandomUsers();
          getAllUserByPage();
        ">
        新增
      </el-button>
      <el-button
        @click="
          showOperation = !showOperation;
          showSelection = !showSelection;
        ">
        操作
      </el-button>

      <el-popconfirm
        v-if="showOperation"
        title="这是一段内容确定删除吗？"
        @confirm="
          let ids = [];
          selections.forEach((val) => {
            ids.push(val.id);
          });
          deleteUsersByIdInBatch(ids.toString());
          getAllUserByPage();
        ">
        <el-button
          slot="reference"
          type="danger">
          批量删除
        </el-button>
      </el-popconfirm>
    </div>

    <page-table
      v-loading="isTableLoading"
      :columns="table.columns"
      :show-index="showIndex"
      :show-selection="showSelection"
      :show-operation="showOperation"
      :operations="table.operations"
      show-pagination
      :data="pageData.list"
      :page-size="pageData.pageSize"
      :current-page="pageData.pageNum"
      :total="pageData.total"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange"
      @handle-selection-change="handleSelectionChange" />
  </div>
</template>

<script>
import PageTable from "@/components/common/PageTable.vue";
import { deleteUserById, deleteUsersByIdInBatch, getUsers, saveUser, updateUser } from "@/api/access/admin/user";
import { randInt, randStr } from "@/utils/utils";

export default {
  name: "DataView",
  components: {
    PageTable,
  },
  data() {
    return {
      isTableLoading: false,
      showIndex: false,
      showSelection: false,
      showOperation: false,
      table: {
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
            sortable: false,
          },
        ],
        operations: [
          {
            name: "查看",
            size: "mini",
            click: (id) => this.handleClickGet(id),
          },
          {
            name: "修改",
            size: "mini",
            click: (id) => this.handleClickUpdate(id),
          },
          {
            name: "删除",
            type: "danger",
            size: "mini",
            click: (id) => this.handleClickDelete(id),
          },
        ],
        data: [],
      },
      pageData: {
        pageNum: 1,
        pageSize: 10,
        totalPage: 1,
        total: 0,
        sortBy: "id",
        sortOrder: "asc",
        list: [],
      },
      selections: [],
    };
  },
  async created() {
    await this.getAllUserByPage();
  },
  methods: {
    handleSizeChange(pageSize) {
      console.log(`每页：${pageSize}条`);
      this.pageData.pageNum = 1;
      this.pageData.pageSize = pageSize;
      this.getAllUserByPage();
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.pageData.pageNum = currentPage;
      this.getAllUserByPage();
    },
    handleSelectionChange(selections) {
      this.selections = selections;
      console.log(this.selections);
    },
    handleClickGet(index) {
      let data = this.pageData.list[index];
      console.log(data);
    },
    handleClickUpdate(index) {
      let data = this.pageData.list[index];
      console.log(data);
    },
    handleClickDelete(index) {
      let data = this.pageData.list[index];
      console.log(data);
      this.deleteUserById(data.id);
      this.getAllUserByPage();
    },
    async getAllUserByPage() {
      this.isTableLoading = true;
      let response = await getUsers({
        pageNum: this.pageData.pageNum,
        pageSize: this.pageData.pageSize,
      });
      this.isTableLoading = false;
      // console.log(["response context", response]);

      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
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
    async deleteUserById(id) {
      let response = await deleteUserById(id);
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
    async deleteUsersByIdInBatch(ids) {
      let response = await deleteUsersByIdInBatch(ids);
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
