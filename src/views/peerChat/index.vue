<template>
  <div>
    <div class="connect">
      <el-input v-model="wsUrl"></el-input>
      <el-button
        v-if="connectStatus === 'disconnected'"
        @click="connect()">
        连接
      </el-button>
      <el-button
        v-else
        @click="disconnect()">
        断开
      </el-button>
    </div>

    <div class="connect">
      <el-button @click="inviteWebRTC()">开启WebRTC</el-button>
      <el-button @click="getConnectedUserList()">获取用户列表</el-button>
      <el-button @click="playLocalVideo()">开启设备</el-button>
    </div>

    <div id="videos">
      <video
        id="localVideo"
        class="video-player"
        autoplay
        playsinline />
      <video
        id="remoteVideo"
        class="video-player"
        autoplay
        playsinline />
    </div>

    <div>
      <el-select
        v-model="selectedDevice"
        placeholder="请选择摄像头"
        @select="getConnectedDevicesToData('videoinput')">
        <el-option
          v-for="device in devices"
          :key="device.label"
          :label="device.label"
          :value="device"></el-option>
      </el-select>
      <p>device: {{ selectedDevice ? selectedDevice.label : "null" }}</p>
      <p>deviceId: {{ selectedDevice ? selectedDevice.deviceId : "null" }}</p>
    </div>

    <div>
      <p>用户列表</p>
      <el-button
        v-for="user in users"
        :key="user.username"
        @click="inviteWebRTC(user)">
        {{ user.username }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { getConnectedUserList, getWssUrl } from "@/api/service/rtc/ws";

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
      offerOptions: {
        iceRestart: true,
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      },
    };
  },

  async created() {
    this.getUrl();
    this.connect();
    await this.getConnectedDevicesToData("videoinput");
    if (this.devices.length !== 0) {
      this.selectedDevice = this.devices[0];
    } else {
      alert("无摄像媒体设备");
    }
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
      console.log("received data: ", data);
      let message = JSON.parse(data.data);
      console.log("received data message: ", message);
      if (message.data.rtcCmd) {
        console.log("WebRTC Command: ", message.data.rtcCmd);
        switch (message.data.rtcCmd) {
          case "ready":
            this.onReady(message);
            break;
          case "offer":
            this.onOffer(message);
            break;
          case "answer":
            this.onAnswer(message);
            break;
          case "candidate":
            this.onCandidate(message);
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
            data: { rtcCmd: "ready" },
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
        this.localStream = await this.openLocalMedia(this.selectedDevice.deviceId, 800, 600);
        let localVideo = document.querySelector("video#localVideo");
        localVideo.srcObject = this.localStream;
        await localVideo.play();
      } catch (e) {
        console.log(e);
      }
    },

    playRemoteVideo(event) {
      console.log("playRemoteVideo", event);
      this.remoteStream = event.streams[0];
      let remoteVideo = document.querySelector("video#remoteVideo");
      remoteVideo.srcObject = this.remoteStream;
      remoteVideo.play();
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

    onReady(message) {
      this.initRTCPeerConnection(message.sender);
      this.createOffer().then((sessionDescription) => {
        console.log("offer created: ", sessionDescription);
        this.setLocalDescription(sessionDescription);
        console.log("offer send to: ", message.sender);
        this.sendOffer(sessionDescription, message.sender);
      });
    },

    onOffer(message) {
      this.initRTCPeerConnection(message.sender);
      this.setRemoteDescription(new RTCSessionDescription(message.data.sdp));
      this.createAnswer().then((sessionDescription) => {
        console.log("answer created: ", sessionDescription);
        this.setLocalDescription(sessionDescription);
        console.log("answer send to: ", message.sender);
        this.sendAnswer(sessionDescription, message.sender);
      });
    },

    onAnswer(message) {
      this.setRemoteDescription(new RTCSessionDescription(message.data.sdp));
    },

    onCandidate(message) {
      let candidate = message.data.candidate;
      console.log("received candidate: ", candidate);
      let rtcIceCandidate = new RTCIceCandidate(message.data.candidate);
      this.addIceCandidate(rtcIceCandidate);
    },

    initRTCPeerConnection(user) {
      console.log("initRTCPeerConnection");
      this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);

      this.rtcPeerConnection.onicecandidate = (event) => {
        console.log("onicecandidate", event);
        if (event.candidate) {
          this.sendCandidate(event.candidate, user);
        }
      };
      this.rtcPeerConnection.ontrack = (event) => {
        console.log("onTrack", event);
        this.playRemoteVideo(event);
      };

      this.localStream.getTracks().forEach((track) => {
        this.rtcPeerConnection.addTrack(track, this.localStream);
      });
    },

    async createOffer() {
      return await this.rtcPeerConnection.createOffer(this.offerOptions);
    },

    sendOffer(sessionDescription, user) {
      let message = {
        receivers: [user],
        data: {
          rtcCmd: "offer",
          sdp: sessionDescription,
        },
      };
      this.sendMessage(JSON.stringify(message));
    },

    async createAnswer() {
      return await this.rtcPeerConnection.createAnswer(this.offerOptions);
    },

    sendAnswer(sessionDescription, user) {
      let message = {
        receivers: [user],
        data: {
          rtcCmd: "answer",
          sdp: sessionDescription,
        },
      };
      this.sendMessage(JSON.stringify(message));
    },

    sendCandidate(candidate, user) {
      console.log("sendCandidate candidate", candidate);
      let message = {
        receivers: [user],
        data: {
          rtcCmd: "candidate",
          candidate: {
            sdpMid: candidate.sdpMid,
            sdpMLineIndex: candidate.sdpMLineIndex,
            candidate: candidate.candidate,
          },
        },
      };
      console.log("sendCandidate", message);
      this.sendMessage(JSON.stringify(message));
    },

    setLocalDescription(sessionDescription) {
      this.rtcPeerConnection.setLocalDescription(sessionDescription);
      console.log("setLocalDescription: ", sessionDescription);
    },

    setRemoteDescription(sessionDescription) {
      this.rtcPeerConnection.setRemoteDescription(sessionDescription);
      console.log("setRemoteDescription: ", sessionDescription);
    },

    addIceCandidate(candidate) {
      this.rtcPeerConnectionIceCandidate(candidate);
      console.log("addIceCandidate: ", candidate);
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
