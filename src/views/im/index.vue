<template>
  <div class="webSocket-container">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12">
        <el-alert
          type="success"
          :closable="false">
          webSocket连接{{ status }}！
        </el-alert>
        <br />
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px">
          <el-form-item label="地址">
            <el-input v-model="wsUrl"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="this.isConnect"
              type="primary"
              @click="disconnect">
              断开
            </el-button
            >
            <el-button
              v-else
              type="primary"
              @click="connect">
              连接
            </el-button
            >
          </el-form-item>
          <el-form-item
            label="消息"
            prop="message">
            <el-input v-model="form.message"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submit"
            >发送消息
            </el-button>
          </el-form-item>
          <el-form-item label="返回信息汇总">
            {{ messages }}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getWssUrl, getWsUrl } from "@/api/service/rtc/ws";

export default {
  name: "IM",
  components: {},
  data() {
    return {
      wsUrl: null,
      username: String(Math.floor(Math.random() * 1000000)),
      webSocket: null,
      messages: [],
      status: "",
      isConnect: false,
      form: { message: 123 },
      rules: {
        message: [{ required: true, message: "请输入消息", trigger: "blur" }],
      },
    };
  },
  async created() {
    await this.getUrl();
  },
  destroyed() {
    this.disconnect();
  },
  methods: {
    async getUrl() {
      let res = await getWsUrl();
      this.wsUrl = res.data + "?username=" + this.username;

      this.wsUrl = CONFIG.WS_URL + "rtc/ws?username=" + this.username;
      console.log("this.wsUrl");
      console.log(this.wsUrl);
    },
    getWssUrl() {
      this.wsUrl = getWssUrl() + this.username;
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.send(
            JSON.stringify({
              data: this.form.message,
            })
          );
        } else {
          return false;
        }
      });
    },
    connect() {
      console.log(this.wsUrl);
      const wsUri = this.wsUrl;
      this.webSocket = new WebSocket(wsUri);
      this.webSocket.onmessage = this.onmessage;
      this.webSocket.onopen = this.onopen;
      this.webSocket.onerror = this.onerror;
      this.webSocket.onclose = this.onclose;
      this.isConnect = true;
    },
    disconnect() {
      this.webSocket.close();
      this.isConnect = false;
    },
    onopen() {
      this.status = "成功";
    },
    onerror() {
      this.status = "失败";
    },
    onmessage(data) {
      console.log(data);
      this.messages.push(data.data);
      console.log(JSON.stringify(this.data));
    },
    send(Data) {
      this.webSocket.send(Data);
    },
    onclose() {
      this.status = "断开";
    },
  },
};
</script>
