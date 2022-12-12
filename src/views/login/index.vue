<template>
  <div>
    <h1>{{ loginMsg }}</h1>
  </div>
</template>

<script>
import { getTokenFromStorage, removeTokenFromStorage, setTokenToStorage } from "@/utils/auth";
import router from "@/router";
import { checkToken } from "@/api/access/auth/token";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      loginMsg: "",
    };
  },
  created() {
    axios.get("/api/auth/oauth/check_token", { params: { token: "asdfasdfa" } }).then((res) => {
      console.log("res");
      console.log(res);
    });
    checkToken("asdfasd").then((res) => {
      console.log("res");
      console.log(res);
    });
  },
  methods: {
    async route() {
      let token = getTokenFromStorage();
      console.log(token);
      let realToken = null;
      if (token) {
        realToken = token.replace("Bearer ", "");
      } else {
        realToken = this.$route.query.token;
        token = this.$route.query.tokenType + " " + realToken;
      }
      this.loginMsg = realToken;
      if (await this.checkLocalToken(realToken)) {
        this.loginMsg = "token有效";
        setTokenToStorage(token);
        this.pointToPath();
      } else {
        this.loginMsg = "没有token";
      }
    },
    async checkLocalToken(token) {
      let response = await checkToken(token);
      console.log(response);
      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
        return true;
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
        removeTokenFromStorage();
        return false;
      } else {
        removeTokenFromStorage();
        return false;
      }
    },
    pointToPath() {
      const pointToPath = this.$route.query.pointToPath;
      if (!pointToPath) {
        console.log("pointToPath: null");
        return;
      }
      if (pointToPath) {
        console.log("pointToPath: " + pointToPath);
        router.push(pointToPath);
      }
    },
  },
};
</script>

<style scoped></style>
