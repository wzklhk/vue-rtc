<template>
  <div>
    <video
        id="videoPlayerTest"
        class="video-player"
        autoplay
        playsinline></video>
  </div>
</template>

<script>
import {playByRoomAndDisplay} from "@/api/service/rtc/srs";
import FlvJs from "flv.js";

export default {
  name: "Player",
  props: {
    url: String,
    playRoom: {type: String, default: "live"},
    playDisplay: {type: String, default: "livestream"},
  },
  data() {
    return {
      publishStream: null,
      playStream: null,
    };
  },
  created() {
    console.log("playFlv");
    this.playRtc();
  },
  methods: {
    async playRtc() {
      let pc = new RTCPeerConnection(null);
      pc.addTransceiver("audio", {direction: "recvonly"});
      pc.addTransceiver("video", {direction: "recvonly"});
      let stream = new MediaStream();
      pc.ontrack = (event) => {
        stream.addTrack(event.track);
      };

      let videoElement = document.querySelector("video#videoPlayerTest");
      videoElement.srcObject = stream;

      let offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      let response = await playByRoomAndDisplay(this.playRoom, this.playDisplay, offer.sdp);
      await pc.setRemoteDescription(new RTCSessionDescription({type: "answer", sdp: response.data.sdp}));
    },

    playFlv(url) {
      if (!FlvJs.isSupported()) {
        return;
      }
      let flvPlayer = FlvJs.createPlayer({type: "flv", url: this.url});
      flvPlayer.attachMediaElement(document.getElementById("video_player"));
      flvPlayer.load();
      flvPlayer.play();
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
