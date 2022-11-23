<template>
  <div>
    <b-nav class="fixed-top d-flex flex justify-content-between">
      <b-nav-item :to="{ name: 'main' }" exact exact-active-class="active">
        TiCi
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
            <img src="@/statics/smile.png" style="width: 40px; height: 40px" />
          </template>

          <!-- <b-dropdown-item
            :to="{ name: 'profile', params: { username: username } }"
          > -->
          <b-dropdown-item
            :to="{ name: 'userProfile', params: { username: username } }"
          >
            <!-- exact
            exact-active-class="active" -->
            마이페이지
          </b-dropdown-item>
          <b-dropdown-item
            :to="{ name: 'profileConfig', params: { username: username } }"
          >
            설정
          </b-dropdown-item>
          <!-- <b-dropdown-devider></b-dropdown-devider> -->
          <b-dropdown-item @click="logOut">로그아웃</b-dropdown-item>
        </b-nav-item-dropdown>
      </div>
    </b-nav>

    <!-- <nav class="navbar fixed-top">
      <div class="container-fluid">
        <router-link :to="{ name: 'main' }" class="navbar-brand">
          TiCi
        </router-link>
        <div>
          <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">
            Log In
          </router-link>
          <router-link to="/main">Log Out</router-link>
          <router-link :to="{ name: 'signup' }" v-if="!isLoggedIn">
            Sign Up
          </router-link>
          <router-link
            :to="{ name: 'profile', params: { username: username } }"
            v-if="isLoggedIn"
          >
            Profile
          </router-link>
        </div>
      </div>
    </nav> -->
  </div>
</template>

<script>
import VueCookie from "vue-cookies";

export default {
  name: "NavigationBar",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
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
</style>
