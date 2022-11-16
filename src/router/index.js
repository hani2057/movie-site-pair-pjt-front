import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "@/views/MainView";
// import DetailView from "@/views/DetailView";
import ListView from "@/views/ListView";
import ProfileView from "@/views/ProfileView";
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
    path: "/detail/:id",
    name: "detail",
    // component: DetailView,
    component: () => import("@/views/DetailView"),
  },
  {
    path: "/list",
    name: "list",
    component: ListView,
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: ProfileView,
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
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
