<template>
  <div>
    <el-header class="black" height="100%">
      <main-header :drawer-collapse="drawerCollapse" :headerHeight="this.headerHeight" :menu-collapse="menuCollapse" />
    </el-header>
    <el-drawer :direction="'ltr'" :visible.sync="isDrawer" :size="this.menuWidth" title="menu">
      <main-nav-menu background-color="lightgray" class="mobile-menu" />
    </el-drawer>
    <el-container :style="{ height: `calc(100vh - ${this.headerHeight})` }">
      <el-aside width="auto">
        <main-nav-menu
          active-text-color="white"
          :collapse="isMenuCollapse"
          background-color="lightgray"
          class="desktop-menu hidden-xs-only" />
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import MainNavMenu from "@/components/MainNavMenu";
import MainHeader from "@/components/MainHeader";

export default {
  name: "Home",
  components: {
    MainHeader,
    MainNavMenu,
  },
  data() {
    return {
      headerHeight: "56px",
      menuWidth: "240px",

      isMenuCollapse: false,
      isDrawer: false,

      collapseText: "",
    };
  },
  methods: {
    menuCollapse() {
      this.isMenuCollapse = !this.isMenuCollapse;
    },
    drawerCollapse() {
      this.isDrawer = !this.isDrawer;
    },
  },
};
</script>

<style lang="css">
.desktop-menu:not(.el-menu--collapse) {
  width: 240px;
}

.desktop-menu {
  height: 100%;
}

.mobile-menu {
  height: 100%;
}

.main {
  padding: 0;
}
</style>