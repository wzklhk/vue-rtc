<template>
  <div>
    <el-header class="room-header">
      <el-button
          circle
          class="buttons-color"
          @click="collapseMembers">
        <i class="el-icon-user"></i>
      </el-button>

      <h1>{{ roomName }}</h1>

      <div>
        <el-button
            circle
            class="buttons-color"
            @click="collapseMessages">
          <i class="el-icon-chat-line-round"></i>
        </el-button>
        <el-button
            circle
            class="buttons-color"
            @click="exitRoom">
          <i class="el-icon-right"></i>
        </el-button>
      </div>
    </el-header>

    <el-container class="room-container">
      <el-main
          class="room-members"
          v-if="membersCollapse">
        <div class="members-header">
          <p>Participants</p>
          <strong class="members-count">{{ memberCount }}</strong>
        </div>
      </el-main>

      <el-main class="room-main">
        <video src=""></video>
        <video src=""></video>
        <video src=""></video>
      </el-main>

      <el-main
          class="room-messages"
          v-if="messagesCollapse">
        <h1>chat</h1>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "room",
  data() {
    return {
      roomName: "roomName",
      memberCount: 0,
      membersCollapse: true,
      messagesCollapse: true,
    };
  },
  methods: {
    collapseMembers() {
      this.membersCollapse = !this.membersCollapse;
    },
    collapseMessages() {
      this.messagesCollapse = !this.messagesCollapse;
    },
    exitRoom() {
      router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.room-header {
  height: $sys-layout-header-height;
  background-color: $room-header-color-background;
  border-bottom: 1px solid $room-header-color-border;
  color: $room-header-text-color;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

.room-container {
  height: $sys-layout-main-height;
}

.room-members {
  background-color: $room-members-color-background;
  border: 1px solid $room-members-color-border;
  color: $room-header-text-color;
  margin: 0;
  width: 200px;
}

.members-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1rem;
  position: fixed;
  font-size: 18px;
  background-color: #323143;
  //width: 100%;
}

.members-count {
  background-color: #1d1d1c;
  padding: 7px 15px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
}

.room-main {
  background-color: $room-main-color-background;
  border: 1px solid $room-main-color-border;
  color: $room-header-text-color;
  width: 100%;
}

.room-messages {
  background-color: $room-messages-color-background;
  border: 1px solid $room-messages-color-border;
  color: $room-header-text-color;
  width: 200px;
}
</style>
