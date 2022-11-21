<template>
  <div class="component-wrapper">
    <h1>LogIn Page</h1>
    <form @submit.prevent="logIn">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username" /><br />

      <label for="password"> password : </label>
      <input type="password" id="password" v-model="password" /><br />

      <input type="submit" value="logIn" />

      <a @click="getTest">get cookie</a><br />
      <a @click="setTest">set cookie</a><br />
      <a @click="resetTest">reset cookie</a><br />
    </form>

    <!-- <CookieTest/> -->
  </div>
</template>

<script>
import VueCookie from "vue-cookies";
// import CookieTest from '@/components/CookieTest.vue'

export default {
  name: "LogInView",
  // components:{
  //   CookieTest,
  // },
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    logIn() {
      const username = this.username;
      const password = this.password;

      const payload = {
        username: username,
        password: password,
      };
      this.setTest();
      this.$store.dispatch("logIn", payload);
    },
    getTest() {
      if (VueCookie.isKey("id")) {
        alert(VueCookie.get("id"));
      } else {
        alert("값 없음");
      }
      console.log(VueCookie);
    },
    setTest() {
      console.log(this.username);
      VueCookie.set("id", this.username);
    },
    resetTest() {
      alert("삭제됨");
      VueCookie.remove("id");
    },
  },
};
</script>
