<template>
  <fragment>
    <template v-if="!item.children">
      <el-menu-item :index="this.basePath">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>

    <template v-else>
      <el-submenu :index="resolvePath(item.path)">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <sys-aside-item
          v-for="child in item.children"
          :key="child.name"
          :item="child"
          :base-path="resolvePath(child.path)" />
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  name: "SysAsideItem",
  props: {
    item: {
      type: Object,
      require: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      console.log(this.basePath + "/" + routePath);
      return this.basePath + "/" + routePath;
    },
  },
};
</script>

<style lang="scss" scoped></style>