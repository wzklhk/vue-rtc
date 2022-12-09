<template>
  <div>
    <el-table ref="multipleTable" :data="data.list" class="data-table" style="width: 100%">
      <el-table-column type="index" v-if="showIndex" />
      <el-table-column
        type="selection"
        v-if="showSelection"
        show-overflow-tooltip
        @selection-change="handleSelectionChange" />
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable" />
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentSize"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PageTable",
  props: {
    // 表设置
    showIndex: { type: Boolean, default: false },
    showSelection: { type: Boolean, default: false },
    columns: { type: Array, default: () => [] },
    data: { type: Object, default: () => {} },
    // 页设置
    pageSizes: { type: Array, default: () => [10, 20, 50, 100] },
  },
  created() {
    this.getData();
  },
  data() {
    return {
      pageData: [],
      currentSize: 1,
      pageSize: 10,
      total: 0,
    };
  },
  computed: {},
  methods: {
    getData() {
      console.log(["thisdata", this.data]);
      this.pageData = this.data.list;
      this.currentSize = this.data.pageNum;
      this.pageSize = this.data.pageSize;
      this.total = this.data.total;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
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
  },
};
</script>

<style scoped></style>
