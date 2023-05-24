<template>
  <div>
    <h1>player</h1>
    <Player
        :url="this.url"
        play-room="live"
        play-display="livestream"></Player>
  </div>

</template>

<script>
import Player from "@/components/Player.vue";

export default {
  name: "index",
  components: {Player},
  data() {
    return {
      url: "http://localhost:8080/live/livestream.flv",
    };
  },
};
</script>

<style scoped></style>