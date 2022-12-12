<template>
  <el-container>
    <el-header class="layout-header">
      <sys-header class="sys-header-container" />
    </el-header>

    <el-container class="layout-container">
      <el-aside
        class="layout-aside"
        width="auto">
        <sys-aside />
      </el-aside>

      <el-main class="layout-main">
        <sys-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import variables from "@/styles/variables.module.scss";
import SysHeader from "@/layout/components/SysHeader";
import SysAside from "@/layout/components/SysAside";
import SysMain from "@/layout/components/SysMain";

export default {
  name: "SysLayout",
  components: {
    SysHeader,
    SysAside,
    SysMain,
  },
  computed: {
    variables() {
      return variables;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.layout-header {
  height: $sys-layout-header-height;
  background-color: $sys-header-color-background;
  color: $header-text-color;
  padding: 0 8px;
}

.sys-header-container {
  height: $sys-layout-header-height;
}

.layout-container {
  height: $sys-layout-main-height;
}

.layout-main {
  background-color: $sys-main-color-background;
}

.layout-box-card {
}
</style>
