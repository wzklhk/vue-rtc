const menu = {
  menuItems: [
    {
      path: "/home",
      name: "home",
      meta: {
        title: "hello vue",
        icon: "el-icon-user",
      },
    },
    {
      path: "/data",
      name: "data",
      meta: {
        title: "table data",
        icon: "el-icon-s-data",
      },
    },
    {
      path: "/av",
      name: "av",
      meta: {
        title: "audio and video",
        icon: "el-icon-video-play",
      },
    },
    {
      path: "/video",
      name: "video",
      meta: {
        title: "video stream",
        icon: "el-icon-video-camera",
      },
    },
    {
      path: "/peerChat",
      name: "peerChat",
      meta: {
        title: "peer chat",
        icon: "el-icon-video-camera",
      },
    },
    {
      path: "/404",
      name: "404",
      meta: {
        title: "not found",
        icon: "el-icon-close",
      },
    },
    {
      path: "/403",
      name: "403",
      meta: {
        title: "forbidden",
        icon: "el-icon-close",
      },
    },
    {
      path: "/layout",
      name: "layout1",
      meta: {
        title: "--layout1",
        icon: "el-icon-s-home",
      },
    },
    {
      path: "/layout",
      name: "layout2",
      meta: {
        title: "--layout2",
        icon: "el-icon-more",
      },
      children: [
        {
          path: "av",
          name: "av",
          meta: {
            title: "--av",
          },
        },
        {
          path: "data",
          name: "data",
          meta: {
            title: "--data",
          },
        },
        {
          path: "video",
          name: "video",
          meta: {
            title: "--video",
          },
        },
      ],
    },
    {
      path: "/main",
      name: "layout3",
      meta: {
        title: "--layout3",
        icon: "el-icon-more",
      },
      children: [
        {
          path: "hello",
          name: "hello",
          meta: {
            title: "hello vue",
            icon: "el-icon-user",
          },
        },
        {
          path: "data",
          name: "data",
          meta: {
            title: "table data",
            icon: "el-icon-s-data",
          },
        },
        {
          path: "av",
          name: "av",
          meta: {
            title: "audio and video",
            icon: "el-icon-video-play",
          },
        },
        {
          path: "video",
          name: "video",
          meta: {
            title: "video stream",
            icon: "el-icon-video-camera",
          },
        },
        {
          path: "hello2",
          name: "hello2",
          meta: {
            title: "--hello",
          },
          children: [
            {
              path: "hello3",
              name: "hello3",
              meta: {
                title: "--hello",
              },
              children: [
                {
                  path: "hello4",
                  name: "hello4",
                  meta: {
                    title: "--hello",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/im",
      name: "im",
      meta: {
        title: "websocket",
        icon: "el-icon-phone",
      },
    },
    {
      path: "https://www.baidu.com",
      name: "baidu",
      meta: {
        title: "baidu",
        icon: "el-icon-platform-eleme",
      },
    },
  ],
};

module.exports = menu;
