<template>
  <div>
    <div class="connect">
      <el-input v-model="wsUrl"></el-input>
      <el-button v-if="connectStatus === 'disconnected'" @click="connect()">连接</el-button>
      <el-button v-else @click="disconnect()">断开</el-button>
    </div>

    <div class="connect">
      <el-button @click="inviteWebRTC()">开启WebRTC</el-button>
      <el-button @click="getConnectedUserList()">获取用户列表</el-button>
    </div>

    <div id="videos">
      <video id="localVideo" class="video-player" autoplay playsinline></video>
      <video id="remoteVideo" class="video-player" autoplay playsinline></video>
    </div>

    <div>
      <el-select v-model="selectedDevice" placeholder="请选择摄像头" @select="getConnectedDevicesToData('videoinput')">
        <el-option v-for="device in devices" :key="device.label" :label="device.label" :value="device"></el-option>
      </el-select>
      <p>device: {{ selectedDevice ? selectedDevice.label : "null" }}</p>
      <p>deviceId: {{ selectedDevice ? selectedDevice.deviceId : "null" }}</p>
    </div>

    <div>
      <p>用户列表</p>
      <el-button v-for="user in users" :key="user.username" @click="inviteWebRTC(user)">{{ user.username }}</el-button>
    </div>
  </div>
</template>

<script>
import { getConnectedUserList, getWssUrl } from "@/api/im";

export default {
  name: "PeerChat",
  data() {
    return {
      wsUrl: null,
      users: [],
      webSocket: null,
      devices: [],
      selectedDevice: null,
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
  async created() {
    this.getUrl();
    this.connect();
    await this.getConnectedDevicesToData("videoinput");
    await this.getConnectedUserList();
  },
  methods: {
    getUrl() {
      this.wsUrl = getWssUrl() + "?username=" + this.userId;
    },

    async getConnectedUserList() {
      let res = await getConnectedUserList();
      this.users = res.data;
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
      let message = JSON.parse(data.data);
      console.log(message);
      if (message.data.webrtc) {
        console.log(message.data.webrtc);
        switch (message.data.webrtc) {
          case "ready":
            this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
            this.rtcPeerConnection.onicecandidate = this.onIceCandidate;
            break;
          case "offer":
            this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
            this.rtcPeerConnection.onicecandidate = this.onIceCandidate;
            break;
          default:
            break;
        }
      }
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

    inviteWebRTC(user) {
      console.log("inviteWebRTC");
      if (!user) {
        console.error("no user set");
        return;
      } else {
        console.log(user);
      }
      this.playLocalVideo()
        .then(() => {
          console.log("打开本地音视频设备成功");
          let message = {
            data: { webrtc: "ready" },
            receivers: [user],
          };
          this.sendMessage(JSON.stringify(message));
        })
        .catch(() => {
          console.log("打开本地音视频设备失败");
        });
    },
    /**
     * Fetch an array of devices of a certain type
     * @param type
     * @returns {Promise<MediaDeviceInfo[]>} devices
     */
    async getConnectedDevices(type) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      if (type == null) {
        return devices;
      } else {
        return devices.filter((device) => device.kind === type);
      }
    },

    async getConnectedDevicesToData(type) {
      this.devices = await this.getConnectedDevices(type);
    },

    async playLocalVideo() {
      try {
        if (!this.selectedDevice) {
          this.$message.warning("请选择设备");
          return;
        }
        const stream = await this.openLocalMedia(this.selectedDevice.deviceId, 800, 600);
        let video = document.querySelector("video#localVideo");
        video.srcObject = stream;
        await video.play();
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Open camera with at least minWidth and minHeight capabilities
     * @param cameraId
     * @param minWidth
     * @param minHeight
     * @returns {Promise<MediaStream>} stream
     */
    async openLocalMedia(cameraId, minWidth, minHeight) {
      const constraints = {
        audio: {
          echoCancellation: true,
        },
        video: {
          deviceId: cameraId,
          width: { min: minWidth },
          height: { min: minHeight },
        },
      };
      return await navigator.mediaDevices.getUserMedia(constraints);
    },

    onOffer(event) {},

    onAnswer(event) {},

    onCandidate(event) {
      let candidate = new RTCIceCandidate({
        sdp: event.sdpMid,
        sdpMLineIndex: event.sdpMLineIndex,
        candidate: event.candidate,
      });
    },

    onIceCandidate(event, user) {
      let message = {
        data: {
          webrtc: "candidate",
          candidate: {
            sdp: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            candidate: event.candidate.candidate,
          },
        },
        receivers: [user],
      };
      this.sendMessage(message);
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