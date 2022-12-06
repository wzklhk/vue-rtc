<template>
  <div>
    <h1>login</h1>
  </div>
</template>

<script>
export default {
  name: "login",
  mounted() {
    this.initQuery();
  },
  methods: {
    initQuery() {
      let params = this.$route.query;
      console.log(params);
    },
  },
};
</script>

<style scoped></style>
