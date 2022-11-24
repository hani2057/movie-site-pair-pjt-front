<template>
  <div>
    <b-nav class="fixed-top d-flex flex justify-content-between" id="navbar">
      <b-nav-item
        :to="{ name: 'main' }"
        exact
        exact-active-class="active"
        id="title-logo"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        TiCi
      </b-nav-item>
      <b-nav-item
        :to="{ name: 'mylists' }"
        exact
        exact-active-class="active"
        id="my-lists-nav"
      >
        My Lists
      </b-nav-item>
      <div>
        <b-nav-item
          :to="{ name: 'login' }"
          exact
          exact-active-class="active"
          class="nav-item__login"
          v-if="!isLoggedIn"
        >
          Log In
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'signup' }"
          exact
          exact-active-class="active"
          class="nav-item__signup"
          v-if="!isLoggedIn"
        >
          Sign Up
        </b-nav-item>
        <b-nav-item-dropdown v-if="isLoggedIn">
          <template #button-content>
            <i class="fa-solid fa-bars" id="menu-btn-nav"></i>
            <!-- <img src="@/statics/smile.png" style="width: 40px; height: 40px" /> -->
          </template>

          <b-dropdown-item
            :to="{ name: 'userProfile', params: { username: username } }"
          >
            마이페이지
          </b-dropdown-item>
          <b-dropdown-item
            :to="{ name: 'profileConfig', params: { username: username } }"
          >
            설정
          </b-dropdown-item>
          <b-dropdown-item @click="logOut">로그아웃</b-dropdown-item>
        </b-nav-item-dropdown>
      </div>
    </b-nav>
  </div>
</template>

<script>
import VueCookie from "vue-cookies";

export default {
  name: "NavigationBar",
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    username() {
      return VueCookie.get("id");
    },
  },
  watch: {
    isLoggedIn() {},
    username() {},
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style>
#navbar {
  background-color: var(--main-bg-color);
  padding-bottom: 5px;
}
.nav-item__login,
.nav-item__signup {
  display: inline-block;
}
.dropdown-menu {
  background-color: var(--main-bg-color);
  border: 1px solid var(--main-text-color);
}
.dropdown-menu a:hover {
  background-color: var(--main-bg-color);
}

@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");
#title-logo {
  padding: 0;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  padding: 5px 10px;
  margin: 10px 0px 0px 30px;
  color: #03f453;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  overflow: hidden;
}
#title-logo:hover {
  background: #03f453;
  color: #050801;
  box-shadow: 0 0 5px #03f453, 0 0 25px #03f453, 0 0 50px #03f453,
    0 0 200px #03f453;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}
body {
  font-family: "Raleway", sans-serif;
  font-weight: bold;
}
#title-logo:nth-child(1) {
  filter: hue-rotate(270deg);
}
#title-logo:nth-child(2) {
  filter: hue-rotate(110deg);
}
#title-logo span {
  position: absolute;
  display: block;
}
#title-logo span:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03f453);
  animation: animate1 1s linear infinite;
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
#title-logo span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03f453);
  animation: animate2 1s linear infinite;
  animation-delay: 0.25s;
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
#title-logo span:nth-child(3) {
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03f453);
  animation: animate3 1s linear infinite;
  animation-delay: 0.5s;
}
@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

#title-logo span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03f453);
  animation: animate4 1s linear infinite;
  animation-delay: 0.75s;
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
#my-lists-nav {
  margin-top: 15px;
}
#menu-btn-nav {
  font-size: 30px;
  color: var(--main-text-color);
  margin-top: 10px;
}
</style>
