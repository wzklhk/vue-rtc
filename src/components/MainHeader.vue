<template>
  <div id="header" :style="{ height: headerHeight }">
    <div id="start">
      <!--窄屏模式下伸缩菜单按钮，宽屏时不显示-->
      <el-button circle class="hidden-sm-and-up buttons-color" icon="el-icon-s-operation" @click="drawerCollapse" />
      <!--宽屏模式下伸缩菜单按钮，窄屏时不显示-->
      <el-button circle class="hidden-xs-only buttons-color" icon="el-icon-s-operation" @click="menuCollapse" />
    </div>
    <div id="center">
      <h1>title</h1>
    </div>
    <div id="end">
      <el-dropdown>
        <el-button circle class="buttons-color">
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
export default {
  name: "MainHeader",
  props: {
    drawerCollapse: Boolean,
    menuCollapse: Boolean,
    headerHeight: String,
  },
};
</script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
</style>
