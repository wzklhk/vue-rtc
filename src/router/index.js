import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeLayout",
    component: Layout,
    redirect: "/login",
    children: [
      {
        path: "/layout",
        name: "layout",
        component: () => import("@/layout/index.vue"),
        children: [
          {
            path: "hello",
            name: "Hello2",
            component: () => import("@/components/HelloWorld.vue"),
          },
          {
            path: "data",
            name: "Data2",
            component: () => import("@/views/main/data/index.vue"),
          },
          {
            path: "video",
            name: "Video2",
            component: () => import("@/views/main/video/index.vue"),
          },
          {
            path: "av",
            name: "AV2",
            component: () => import("@/views/main/av/index.vue"),
          },
        ],
      },
      {
        path: "/main",
        name: "main",
        component: () => import("@/views/main/index.vue"),
        children: [
          {
            path: "hello",
            name: "Hello",
            component: () => import("@/components/HelloWorld.vue"),
          },
          {
            path: "data",
            name: "Data",
            component: () => import("@/views/main/data/index.vue"),
          },
          {
            path: "video",
            name: "Video",
            component: () => import("@/views/main/video/index.vue"),
          },
          {
            path: "av",
            name: "AV",
            component: () => import("@/views/main/av/index.vue"),
          },
        ],
      },
      {
        path: "im",
        name: "IM",
        component: () => import("@/views/im/index.vue"),
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
      {
        path: "/home",
        name: "Hello",
        component: () => import("@/components/HelloWorld.vue"),
      },
      {
        path: "/data",
        name: "Data",
        component: () => import("@/views/main/data/index.vue"),
      },
      {
        path: "/video",
        name: "Video",
        component: () => import("@/views/main/video/index.vue"),
      },
      {
        path: "/peerChat",
        name: "peerChat",
        component: () => import("@/views/peerChat/index.vue"),
      },
      {
        path: "/av",
        name: "AV",
        component: () => import("@/views/main/av/index.vue"),
      },
      {
        path: "/srs",
        name: "srs",
        component: () => import("@/views/main/srs/RTC.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/403.vue"),
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
