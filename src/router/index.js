import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import MainView from "@/views/MainView";
// import ProfileView from "@/views/ProfileView";
// import LogInView from "@/views/LogInView";
// import SignUpView from "@/views/SignUpView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    // children: [
    //   {
    //     path: 'action',
    //     component:
    //   }
    // ]
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: () => import("@/views/ProfileView"),
    props: true,
    // children: [
    //   {
    //     path: "userMadeList", <= path 앞에 / 붙이면 루트로 인식됨
    //     component: UserMadeList,
    //   },
    // ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LogInView"),
    beforeEnter(to, from, next) {
      const isLoggedIn = store.getters.isLoggedIn;

      if (isLoggedIn) {
        next({ name: "main" });
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/SignUpView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = this.$store.state.isLoggedIn;
//   const authRequiredPages = [];
//   const isAuthRequired = authPages.includes(to.name);

//   if (isAuthRequired && !isLoggedIn) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

export default router;
