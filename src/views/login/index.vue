<template>
  <div>
    <h1>login</h1>
  </div>
</template>

<script>
import { setToken } from "@/utils/auth";
import router from "@/router";

export default {
  name: "login",
  mounted() {
    this.initQuery();
  },
  methods: {
    initQuery() {
      let params = this.$route.query;
      console.log(params);
      let tokenType = params.tokenType;
      let realToken = params.token;
      let token = tokenType + " " + realToken + "";
      let pointToPath = params.pointToPath;
      if (tokenType !== undefined || realToken !== undefined) {
        console.log("token: " + token);
        setToken(token);
        sessionStorage.setItem("Authorization", token);
        if (pointToPath) {
          console.log("pointToPath: " + pointToPath);
          router.push(pointToPath);
        } else {
          console.log("pointToPath: undefined");
          router.push("home");
        }
      } else {
        console.log("undefined token");
      }
    },
  },
};
</script>

<style scoped></style>
