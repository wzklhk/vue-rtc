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
      let { formPath, token, tokenType, pointToPath } = this.$route.query;
    },
  },
};
</script>

<style scoped></style>
