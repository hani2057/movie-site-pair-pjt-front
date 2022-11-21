import Vue from "vue";
import VueRouter from "vue-router";
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

export default router;
