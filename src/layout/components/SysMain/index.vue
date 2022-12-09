<template>
  <div>
    <el-card class="layout-box-card">
      <router-view />
    </el-card>
    <sys-footer />
  </div>
</template>

<script>
import SysFooter from "@/layout/components/SysFooter";

export default {
  name: "SysMain",
  components: {
    SysFooter,
  },
};
</script>

<style scoped></style>
