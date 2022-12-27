<template>
  <div>
    <el-button @click="version()">version</el-button>
    <div>
      <h1>RTC推流</h1>
      <div style="display: flex">
        <el-input v-model="publishUrl"></el-input>
        <el-button @click="publish()">开始推流</el-button>
      </div>
      <video
        id="localVideo"
        class="video-player"
        autoplay
        playsinline />
    </div>

    <div>
      <h1>RTC播放</h1>
      <div style="display: flex">
        <el-input v-model="playUrl"></el-input>
        <el-button @click="play()">播放视频</el-button>
      </div>
      <video
        id="localVideo"
        class="video-player"
        autoplay
        playsinline />
    </div>
  </div>
</template>

<script>
import { getVersions, play } from "@/api/srs/srs";

export default {
  name: "RTC",
  data() {
    return {
      publishUrl: "",
      playUrl: "",
      sdk: null,
    };
  },
  methods: {
    publish() {
      if (this.sdk) {
        this.sdk.close();
      }
      this.sdk = new SrsRtcPublisherAsync();

      this.sdk.publish(this.publishUrl).then((session) => {
        console.log(session);
      });
    },
    async play() {
      await play(this.playUrl, "")
    },
    async version() {
      const res = await getVersions();
    },
  },
};
</script>

<style scoped>
.video-player {
  background-color: black;
  width: 100%;
}
</style>
