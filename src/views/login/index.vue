<template>
  <div class="login-bg white">
    <div class="login">
      <el-form
          :model="user"
          ref="userForm">
        <el-form-item>
          <h1>请登录</h1>
        </el-form-item>

        <el-form-item>
          <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="user.username">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            v-model="user.password">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="login">登录</el-button>
          <el-button @click="login" v-if="false">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getAccessTokenFromStorage,
  removeAccessTokenFromStorage,
  setAccessTokenToStorage,
  setRefreshTokenToStorage,
  setTokenTypeToStorage,
} from "@/utils/auth";
import router from "@/router";
import {checkToken, getToken} from "@/api/access/auth/token";

export default {
  name: "login",
  data() {
    return {
      user: {},
      loginMsg: "登录信息：\n",
      ws: null,
      wsStatus: "",
      isWsConnected: false,
    };
  },

  created() {
    this.route();
  },

  methods: {
    async route() {
      let accessToken = getAccessTokenFromStorage();
      console.log("Storage Token: " + accessToken);

      if (this.$route.query.token) {
        accessToken = this.$route.query.token;
        console.log("URL Access Token: " + accessToken);
      }
      if (this.$route.query.tokenType) {
        setTokenTypeToStorage(this.$route.query.tokenType);
      } else {
        setTokenTypeToStorage("Bearer");
      }

      console.log("Real Token: " + accessToken);
      if (await this.checkLocalToken(accessToken)) {
        console.log("token有效");
        setAccessTokenToStorage(accessToken);
        this.loginMsg += "Token: \t" + accessToken + "\n";
        this.connectWs(CONFIG.WS_URL + MODULES.SERVICE_RTC + "/ws?token=" + getAccessTokenFromStorage())
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
        this.loginMsg = JSON.stringify(response.data) + "\n";
        return true;
      } else if (response.code === ERROR_CODE.ERROR) {
        this.$message.error("用户名或密码错误");
        this.loginMsg = response.data + "\n";
        removeAccessTokenFromStorage();
        return false;
      } else {
        removeAccessTokenFromStorage();
        return false;
      }
    },

    pointToPath() {
      const pointToPath = this.$route.query.pointToPath;

      if (pointToPath) {
        console.log("pointToPath: " + pointToPath);
        router.push(pointToPath);
      } else {
        console.log("pointToPath: null");
        router.push("/home");
      }
    },

    async login() {
      let response = await getToken(this.user.username, this.user.password);
      if (response.code === ERROR_CODE.OK) {
        this.$message.success(response.msg);

        setTokenTypeToStorage(response.data.tokenType);
        setAccessTokenToStorage(response.data.accessToken);
        setRefreshTokenToStorage(response.data.refreshToken);

        await this.route();
      } else {
        this.$message.error(response.msg);
        this.$message.error(response.data);
      }
    },

    connectWs(wsUrl) {
      this.ws = new WebSocket(wsUrl);
      this.ws.onmessage = this.onmessage;
      this.ws.onopen = this.onopen;
      this.ws.onerror = this.onerror;
      this.ws.onclose = this.onclose;
      this.isWsConnected = true
    },

    disconnectWs() {
      this.ws.close();
      this.isWsConnected = false;
    },

    onopen() {
      this.wsStatus = "成功";
    },

    onerror() {
      this.wsStatus = "失败";
    },

    onmessage(data) {
      console.log(data);
    },

    send(Data) {
      this.ws.send(Data);
    },

    onclose() {
      this.wsStatus = "断开";
    },
  },
};
</script>

<style scoped>
.login-bg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: 500px;
  text-align: center;
}
</style>
