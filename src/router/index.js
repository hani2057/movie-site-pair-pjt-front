import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import MainView from "@/views/MainView";
import MovieModal from "@/components/MovieModal";
// import ProfileView from "@/views/ProfileView";
// import LogInView from "@/views/LogInView";
// import SignUpView from "@/views/SignUpView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: ":movieTitle",
        name: "movieTitle",
        component: MovieModal,
      },
    ],
  },
  {
    path: "/mylists",
    name: "mylists",
    component: () => import("@/views/MyListsView"),
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: () => import("@/views/UserView"),
    props: true,
    children: [
      {
        path: "",
        name: "userProfile",
        props: true,
        component: () => import("@/components/UserProfile"),
      },
      {
        path: "config",
        name: "profileConfig",
        props: true,
        component: () => import("@/components/UserProfileConfig"),
      },
      // {
      //   path: "userMadeList", <= path 앞에 / 붙이면 루트로 인식됨
      //   component: UserMadeList,
      // },
    ],
  },
  // {
  //   path: "/profile/:username/config",
  //   name: "profileConfig",
  //   component: () => import("@/views/ProfileConfigView"),
  // },
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
// router.beforeEnter((to, from, next) => {
//   let access_token = Vue.cookie.get('id')
//   if (access_token == null) {
//       // user doesn't have access token, redirect to login
//       next({ name: 'login' })
//   }
//   else {
//       // user has access token, user can open the page
//       next()
//   }
// })

export default router;
