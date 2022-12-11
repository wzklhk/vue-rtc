<template>
  <el-pagination
    class="page"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    :layout="layout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>

<script>
export default {
  name: "CommonPagination",
  props: {
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
  methods: {
    handleSizeChange(pageSize) {
      this.$emit("handlerSizeChange", pageSize, this.pageSize);
    },
    handleCurrentChange(currentPage) {
      this.$emit("handlerCurrentChange", currentPage, this.currentPage);
    },
  },
};
</script>

<style scoped></style>
