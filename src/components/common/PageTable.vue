<template>
  <div class="page-table">
    <common-table
      :columns="columns"
      :show-index="showIndex"
      :show-selection="showSelection"
      :show-operation="showOperation"
      :operations="operations"
      :border="border"
      :stripe="stripe"
      :data="data"
      @selection-change="handleSelectionChange" />

    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import CommonTable from "@/components/common/CommonTable.vue";
import CommonPagination from "@/components/common/CommonPagination.vue";

export default {
  name: "PageTable",
  components: {
    CommonTable,
    CommonPagination,
  },
  props: {
    columns: { type: Array, default: () => [] },
    showIndex: { type: Boolean, default: false },
    showSelection: { type: Boolean, default: false },
    operations: { type: Array },
    // el-table设置
    data: { type: Array, default: () => [] },
    stripe: Boolean,
    border: Boolean,

    showPagination: { type: Boolean, default: false },
    // el-pagination设置
    pageSize: { type: Number, default: 10 },
    small: Boolean,
    total: Number,
    pageCount: Number,
    pagerCount: {
      type: Number,
      validator(value) {
        return (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
      },
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    layout: { default: "total, ->, sizes, prev, pager, next, jumper" },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      },
    },
    popperClass: String,
    prevText: String,
    nextText: String,
    background: Boolean,
    disabled: Boolean,
    hideOnSinglePage: Boolean,

    showOperation: { type: Boolean, default: false },
  },
  created() {
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit("handle-size-change", pageSize);
    },
    handleCurrentChange(currentPage) {
      this.$emit("handle-current-change", currentPage);
    },
    handleSelectionChange(selections) {
      this.$emit("handle-selection-change", selections);
    },
    handleClickGet(index) {
      console.log(index);
    },
    handleClickUpdate(index) {
      console.log(index);
    },
    handleClickDelete(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
.page-table {
    width: 100%;
    height: 100%;
}
</style>
