import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/global.scss";
import "@/styles/colors.scss";
import Fragment from "vue-fragment";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(Fragment.Plugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
