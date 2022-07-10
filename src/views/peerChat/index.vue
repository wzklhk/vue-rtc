<template>
  <div>
    <div class="connect">
      <el-input v-model="wsUrl"></el-input>
      <el-button v-if="connectStatus === 'disconnected'" @click="connect()">连接</el-button>
      <el-button v-else @click="disconnect()">断开</el-button>
    </div>

    <div class="connect">
      <el-button @click="inviteWebRTC()">开启WebRTC</el-button>
    </div>

    <div id="videos">
      <video id="localVideo" class="video-player" autoplay playsinline></video>
      <video id="remoteVideo" class="video-player" autoplay playsinline></video>
    </div>
  </div>
</template>

<script>
import { getWssUrl } from "@/api/im";

export default {
  name: "PeerChat",
  data() {
    return {
      wsUrl: null,
      webSocket: null,
      localStream: null,
      remoteStream: null,
      rtcPeerConnection: null,
      connectStatus: "disconnected",
      userId: String(Math.floor(Math.random() * 10000)),
      iceServers: {
        iceServers: [{ url: "stun:stun.services.mozilla.com" }, { url: "stun:stun.l.google.com:19302" }],
      },
    };
  },
  created() {
    this.getUrl();
  },
  methods: {
    getUrl() {
      this.wsUrl = getWssUrl() + "?username=" + this.userId;
    },
    connect() {
      this.webSocket = new WebSocket(this.wsUrl);
      this.webSocket.onmessage = this.onmessage;
      this.webSocket.onopen = this.onopen;
      this.webSocket.onerror = this.onerror;
      this.webSocket.onclose = this.onclose;
    },
    disconnect() {
      this.webSocket.close();
    },
    onopen() {
      console.log("connected");
      this.connectStatus = "connected";
    },
    onmessage(data) {
      console.log(data);
    },
    onerror() {
      console.log("error");
    },
    onclose() {
      console.log("disconnected");
      this.connectStatus = "disconnected";
    },
    sendMessage(Data) {
      this.webSocket.send(Data);
    },
    inviteWebRTC() {
      console.log("inviteWebRTC");
    },
    async init() {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      document.getElementById("localVideo").srcObject = this.localStream;

      await this.createOffer();
    },
    async createOffer() {
      this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);

      this.remoteStream = new MediaStream();
      document.getElementById("remoteVideo").srcObject = this.remoteStream;

      this.localStream.getTracks().forEach((track) => {
        this.rtcPeerConnection.addTrack(track, this.localStream);
      });

      this.rtcPeerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          this.remoteStream.addtrack(track);
        });
      };

      this.rtcPeerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
          console.log("new ice candidate: ", event.candidate);
        }
      };

      let offer = await this.rtcPeerConnection.createOffer();
      await this.rtcPeerConnection.setLocalDescription(offer);

      console.log("offer: ", offer);
    },
  },
};
</script>

<style scoped>
.connect {
  display: flex;
}

#videos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
}

.video-player {
  background-color: black;
  width: 100%;
}
</style>