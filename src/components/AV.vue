<template>
  <div>
    <audio
      class="av"
      controls
      src="/static/test.mp3"></audio>
    <video
        id="video_player"
        class="av"
        controls
        src="/static/test.mp4"></video>
  </div>
</template>

<script>
import FlvJs from "flv.js";
import {Hls} from "videojs-contrib-hls";

export default {
  name: "AV",
  data() {
    return {
      flvUrl: "",
      hlsUrl: ""
    };
  },
  methods: {
    playFlv() {
      if (!FlvJs.isSupported()) {
        return;
      }
      let flvPlayer = FlvJs.createPlayer({type: "flv", url: this.flvUrl});
      flvPlayer.attachMediaElement(document.getElementById("video_player"));
      flvPlayer.load();
      flvPlayer.play();
    },
    playHls() {
      if (!Hls.isSupported()) {
        return;
      }
      let hlsPlayer = new Hls();
      hlsPlayer.loadSource(this.hlsUrl);
      hlsPlayer.attachMedia(document.getElementById('video_player'));
    },
  },
};
</script>

<style scoped>
.av {
  width: 100%;
}
</style>
