<template>
  <div>
    <h1 style="margin: 10px; text-align: center">频道管理</h1>
    <div>
      <el-button @click="getAllByPage()">查询</el-button>
      <el-button
          @click="
          saveRandom();
          getAllByPage();
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
          style="margin-left: 10px"
          v-if="showOperation"
          title="这是一段内容确定删除吗？"
          @confirm="
          let ids = [];
          selections.forEach((val) => {
            ids.push(val.id);
          });
          deleteByIdInBatch(ids.toString());
          getAllByPage();
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
        @handle-selection-change="handleSelectionChange"/>
  </div>
</template>

<script>
import PageTable from "@/components/common/PageTable.vue";
import {randInt, randStr} from "@/utils/utils";
import {deleteById, deleteByIdInBatch, get, save, update} from "@/api/service/rtc/channel";

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
            label: "id",
            prop: "id",
            sortable: true,
          },
          {
            label: "频道名",
            prop: "name",
            sortable: true,
          },
          {
            label: "描述",
            prop: "description",
            sortable: false,
          },
          {
            label: "在线状态",
            prop: "isOnlineString",
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
    await this.getAllByPage();
  },
  methods: {
    handleSizeChange(pageSize) {
      console.log(`每页：${pageSize}条`);
      this.pageData.pageNum = 1;
      this.pageData.pageSize = pageSize;
      this.getAllByPage();
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.pageData.pageNum = currentPage;
      this.getAllByPage();
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
      this.deleteById(data.id);
      this.getAllByPage();
    },
    async getAllByPage() {
      this.isTableLoading = true;
      let response = await get({
        pageNum: this.pageData.pageNum,
        pageSize: this.pageData.pageSize,
      });
      this.isTableLoading = false;
      // console.log(["response context", response]);

      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
        let data = response.data;
        console.log(data);
        for (let i = 0; i < data.list.length; i++) {
          console.log(i);
          data.list[i].isOnlineString = data.list[i].isOnline === true ? "在线" : "离线";
        }
        this.pageData = data;
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
      } else {
        this.$message.info(response.msg);
      }
    },
    async saveRandom() {
      let response = await save({
        name: randStr(randInt(8, 10)),
        description: randStr(randInt(20, 50)),
        isOnline: false,
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
    async update(id) {
      let response = await update({
        id: id,
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
    async deleteById(id) {
      let response = await deleteById(id);
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
    async deleteByIdInBatch(ids) {
      let response = await deleteByIdInBatch(ids);
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
