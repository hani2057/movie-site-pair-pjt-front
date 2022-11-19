import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import store from "./store";
import router from "./router";

//cookie
import VueCookies from "vue-cookies"
Vue.use(VueCookies)
Vue.$cookies.config("1d") //1일뒤에 만료되는 쿠키 설정

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
