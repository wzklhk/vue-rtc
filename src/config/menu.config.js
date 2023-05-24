const menu = {
  menuItems: [
    {
      path: "/home",
      name: "home",
      meta: {
        title: "首页",
        icon: "el-icon-house",
      },
    },
    {
      path: "/admin",
      name: "access",
      meta: {
        title: "访问管理",
        icon: "el-icon-user",
      },
      children: [
        {
          path: "user",
          name: "user",
          meta: {
            title: "用户管理",
          },
        },
        {
          path: "role",
          name: "role",
          meta: {
            title: "角色管理",
          },
        },
        {
          path: "channel",
          name: "channel",
          meta: {
            title: "频道管理",
          },
        },
        {
          path: "room",
          name: "room",
          meta: {
            title: "房间管理",
          },
        },
      ],
    },
    {
      path: "/realplay",
      name: "realplay",
      meta: {
        title: "实时视频",
        icon: "el-icon-video-camera",
      },
      children: [
        {
          path: "publish",
          name: "publish",
          meta: {
            title: "实时视频推流",
            icon: "el-icon-video-camera",
          },
        },
        {
          path: "channelList",
          name: "channelList",
          meta: {
            title: "频道列表",
            icon: "el-icon-video-play",
          },
        },
      ],
    },
    {
      path: "/replay",
      name: "replay",
      meta: {
        title: "录像回放",
        icon: "el-icon-video-play",
      },
    },
    {
      path: "/room",
      name: "room",
      meta: {
        title: "语音对讲",
        icon: "el-icon-phone-outline",
      },
      hasChildren: false,
    },
  ],
};

module.exports = menu;
