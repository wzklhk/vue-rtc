<template>
  <div>
    <audio class="av" controls src="/static/test.mp3"></audio>
    <video class="av" controls src="/static/test.mp4"></video>
  </div>
</template>

<script>
export default {
  name: "AV",
};
</script>

<style scoped>
.av {
  width: 100%;
}
</style>
