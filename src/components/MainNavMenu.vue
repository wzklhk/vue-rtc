<template>
  <el-menu
    :active-text-color="activeTextColor"
    :background-color="backgroundColor"
    :collapse="collapse"
    :collapse-transition="collapseTransition"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :menu-trigger="menuTrigger"
    :mode="mode"
    :text-color="textColor"
    :unique-opened="uniqueOpened"
    class="main-nav-menu"
    router
    @select="handleSelect">
    <el-menu-item index="/main">
      <i class="el-icon-house"></i>
      <span slot="title">main</span>
    </el-menu-item>
    <el-menu-item index="/main/hello">
      <i class="el-icon-menu"></i>
      <span slot="title">hello</span>
    </el-menu-item>
    <el-menu-item index="/main/data">
      <i class="el-icon-document"></i>
      <span slot="title">data</span>
    </el-menu-item>
    <el-menu-item index="/main/video">
      <i class="el-icon-video-camera"></i>
      <span slot="title">video</span>
    </el-menu-item>
    <el-menu-item index="/main/av">
      <i class="el-icon-video-camera"></i>
      <span slot="title">av</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "MainNavMenu",

  componentName: "MainNavMenu",

  props: {
    mode: {
      type: String,
      default: "vertical",
    },
    defaultActive: {
      type: String,
      default: "",
    },
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    router: Boolean,
    menuTrigger: {
      type: String,
      default: "hover",
    },
    collapse: Boolean,
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    collapseTransition: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleSelect(index) {
      console.log(index);
      console.log(this.$router);
    },
  },
};
</script>

<style scoped>
.main-nav-menu {
}
</style>