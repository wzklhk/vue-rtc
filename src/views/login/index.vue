<template>
  <div style="white-space: pre-wrap">
    <p>{{ loginMsg }}</p>
  </div>
</template>

<script>
import { getTokenFromStorage, removeTokenFromStorage, setTokenToStorage } from "@/utils/auth";
import router from "@/router";
import { checkToken } from "@/api/access/auth/token";

export default {
  name: "login",
  data() {
    return {
      loginMsg: "登录信息：\n",
    };
  },
  created() {
    this.route();
  },
  methods: {
    async route() {
      let token = getTokenFromStorage();
      this.loginMsg += "Storage Token: \t" + token + "\n";
      let realToken = null;
      if (token) {
        realToken = token.replace("Bearer ", "");
      }
      if (this.$route.query.token) {
        realToken = this.$route.query.token;
        this.loginMsg += "URL Real Token: \t" + realToken + "\n";
      }
      if (this.$route.query.tokenType) {
        token = this.$route.query.tokenType + " " + realToken;
      } else {
        token = "Bearer " + realToken;
      }
      this.loginMsg += "Real Token: \t" + realToken + "\n";
      if (await this.checkLocalToken(realToken)) {
        this.loginMsg += "token有效" + "\n";
        setTokenToStorage(token);
        this.loginMsg += "Token: \t" + token + "\n";
        this.pointToPath();
      } else {
        this.loginMsg += "没有token" + "\n";
      }
    },
    async checkLocalToken(token) {
      let response = await checkToken(token);
      console.log(response);
      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);
        JSON.stringify(response.data)
        this.loginMsg = JSON.stringify(response.data) + "\n";
        return true;
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error(response.msg);
        this.loginMsg = response.data + "\n";
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
