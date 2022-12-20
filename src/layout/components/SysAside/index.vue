<template>
  <el-scrollbar class="sys-aside">
    <div>
      <h1 @click="handleCollapse">LOGO</h1>
    </div>

    <el-menu
      class="sys-menu"
      router
      :background-color="variables.menuColorBackground"
      :active-text-color="variables.menuColorActiveText"
      :text-color="variables.menuColorText"
      :collapse="collapse"
      :collapse-transition="true"
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
      :unique-opened="uniqueOpened"
      mode="vertical">
      <sys-aside-item
        v-for="item in items"
        :key="item.name"
        :item="item"
        :base-path="item.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import variables from "@/styles/variables.module.scss";
import { defaultOpeneds, menuItems, uniqueOpened } from "@/config";
import { mapActions, mapGetters } from "vuex";
import SysAsideItem from "@/layout/components/SysAside/components/SysAsideItem";

export default {
  name: "SysAside",
  components: { SysAsideItem },

  mounted() {
  },
  computed: {
    ...mapGetters({
      collapse: "collapse",
    }),
    defaultActive() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    defaultOpeneds() {
      return defaultOpeneds;
    },
    uniqueOpened() {
      return uniqueOpened;
    },
    variables() {
      return variables;
    },
  },
  data() {
    return {
      items: menuItems,
    };
  },
  methods: {
    ...mapActions({
      changeCollapse: "changeCollapse",
    }),
    handleCollapse() {
      this.changeCollapse();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.sys-aside {
  height: $sys-layout-aside-height;
  background-color: $sys-aside-color-background;
  overflow: hidden;

  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden; // 去除底部滚动条
    }
  }
}

.sys-menu:not(.el-menu--collapse) {
  width: $sys-layout-aside-width;
}

.sys-menu {
  border: 0; // 去除侧边边界线
}
</style>
