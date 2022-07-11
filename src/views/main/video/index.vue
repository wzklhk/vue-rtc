<template>
  <div style="display: flex; flex-direction: column">
    <el-select v-model="device" placeholder="请选择摄像头">
      <el-option v-for="device in devices" :key="device.label" :label="device.label" :value="device"></el-option>
    </el-select>
    <!--<select id="devices">
      <option v-for="device in devices" :key="device">
        {{ device.label }}
      </option>
    </select>-->
    <p>device: {{ device ? device.label : "null" }}</p>
    <p>deviceId: {{ device ? device.deviceId : "null" }}</p>

    <div class="grid">
      <video id="localVideo1" class="videoAndCanvas" autoplay playsinline></video>
      <canvas id="localCanvas1" class="videoAndCanvas"></canvas>
    </div>

    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <el-button @click="playLocalVideo1()"> 开启摄像头</el-button>
      <el-button @click="takePhoto()"> 拍照</el-button>
      <el-button @click="stopLocalVideo1()"> 关闭摄像头</el-button>
    </div>

    <video id="localVideo2" class="video" />

    <video id="localVideo3" class="video" controls />
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      devices: [],
      device: null,
      stream: null,
    };
  },
  async created() {
    this.devices = await this.getConnectedDevices("videoinput");
  },
  mounted() {},
  methods: {
    async playLocalVideo1() {
      try {
        if (!this.device) {
          this.$message.warning("请选择设备");
          return;
        }
        const stream = await this.openCamera(this.device.deviceId, 800, 600);
        let video = document.querySelector("video#localVideo1");
        video.srcObject = stream;
        await video.play();
      } catch (e) {
        console.log(e);
      }
    },

    async stopLocalVideo1() {
      let video = document.querySelector("video#localVideo1");
      if (!video.srcObject) {
        return;
      }
      const stream = video.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
    },

    takePhoto() {
      const video = document.querySelector("video#localVideo1");
      const canvas = (window.canvas = document.querySelector("canvas#localCanvas1"));

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
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

    /**
     * Open camera with at least minWidth and minHeight capabilities
     * @param cameraId
     * @param minWidth
     * @param minHeight
     * @returns {Promise<MediaStream>} stream
     */
    async openCamera(cameraId, minWidth, minHeight) {
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
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
}

.videoAndCanvas {
  background-color: black;
  max-width: 100%;
  width: 100%;
}

.video {
  width: calc(100% - 2px);
  height: 100%;
  /*margin: 10px;*/
  border: 1px solid #000000;
}
</style>