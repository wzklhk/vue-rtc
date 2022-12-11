<template>
  <el-table
    :border="border"
    :stripe="stripe"
    :data="data"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="index"
      v-if="showIndex" />
    <el-table-column
      type="selection"
      v-if="showSelection" />
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      :sortable="item.sortable" />
    <el-table-column
      v-if="showOperation"
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button
          v-for="(item, index) in operations"
          :key="index"
          :type="item.type"
          :size="item.size"
          @click="item.click(scope.$index)">
          {{ item.name }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    showIndex: { type: Boolean, default: false },
    showSelection: { type: Boolean, default: false },
    showOperation: { type: Boolean, default: false },
    operations: {
      type: Array,
      default: () => [
        {
          name: "删除",
          type: "danger",
          size: "mini",
          click: (id) => {
            console.log(`delete ${id}`);
          },
        },
      ],
    },
    columns: { type: Array, default: () => [] },

    // el-table设置
    data: { type: Array, default: () => [] },
    size: String,
    width: [String, Number],
    height: [String, Number],
    maxHeight: [String, Number],
    fit: { type: Boolean, default: true },
    stripe: Boolean,
    border: Boolean,
    rowKey: [String, Function],
    context: {},
    showHeader: { type: Boolean, default: true },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,
    selectOnIndeterminate: { type: Boolean, default: true },
    indent: { type: Number, default: 16 },
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: "hasChildren",
          children: "children",
        };
      },
    },
    lazy: Boolean,
    load: Function,
  },
  data() {
    return {};
  },
  methods: {
    handleSelectionChange(selections) {
      this.$emit("selection-change", selections);
    },
  },
};
</script>

<style scoped></style>
