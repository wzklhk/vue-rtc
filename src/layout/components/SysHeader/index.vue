<template>
  <div class="sys-header">
    <div id="sys-start-panel">
      <el-button
        circle
        class="buttons-color"
        @click="changeCollapse">
        <i
          v-if="collapse"
          class="el-icon-s-unfold"></i>
        <i
          v-else
          class="el-icon-s-fold"></i>
      </el-button>
    </div>

    <div id="sys-center-panel">
      <h1>title</h1>
    </div>

    <div id="sys-end-panel">
      <el-dropdown>
        <el-button
          circle
          class="buttons-color">
          <i class="el-icon-user-solid"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SysHeader",
  computed: {
    ...mapGetters({
      collapse: "collapse",
    }),
  },
  methods: {
    ...mapActions({
      changeCollapse: "changeCollapse",
    }),
  },
};
</script>

<style scoped>
.sys-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
</style>
