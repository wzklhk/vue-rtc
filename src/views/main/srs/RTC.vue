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
        id="publishVideo"
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
        id="playVideo"
        class="video-player"
        autoplay
        playsinline />
    </div>
  </div>
</template>

<script>
import { getVersions, play, publish } from "@/api/service/rtc/srs";

export default {
  name: "RTC",
  data() {
    return {
      publishUrl: "",
      playUrl: "",
      publishStream: null,
      playStream: null,
    };
  },
  methods: {
    async publish() {
      // eslint-disable-next-line no-undef
      const cameras = await getConnectedDevices("videoinput");
      if (!(cameras && cameras.length > 0)) {
        return;
      }
      // Open first available video camera with a resolution of 1280x720 pixels
      // eslint-disable-next-line no-undef
      const stream = await openCamera(cameras[0].deviceId, 1280, 720);

      let videoElement = document.querySelector("video#publishVideo");
      videoElement.srcObject = stream;

      let pc = new RTCPeerConnection(null);
      stream.getTracks().forEach((track) => {
        pc.addTrack(track);
      });

      let offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      let response = await publish(this.publishUrl, offer.sdp);
      await pc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: response.data.sdp }));
    },
    async play() {
      let pc = new RTCPeerConnection(null);
      pc.addTransceiver("audio", { direction: "recvonly" });
      pc.addTransceiver("video", { direction: "recvonly" });
      let stream = new MediaStream();
      pc.ontrack = (event) => {
        stream.addTrack(event.track);
      };

      let videoElement = document.querySelector("video#playVideo");
      videoElement.srcObject = stream;

      let offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      let response = await play(this.playUrl, offer.sdp);
      await pc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: response.data.sdp }));
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
