<template>
  <div class="component-wrapper">
    <div class="login-page d-flex justify-content-center align-items-center">
      <div class="login-wrapper d-flex flex-column align-items-center">
        <h1 class="pb-4">LogIn Page</h1>
        <form
          @submit.prevent="logIn"
          id="login-form"
          class="d-flex flex-column"
        >
          <input
            type="text"
            id="login-username"
            class="login__input"
            placeholder="ID"
            v-model="username"
          />
          <input
            type="password"
            id="login-password"
            class="login__input"
            placeholder="PASSWORD"
            v-model="password"
          />
          <button type="submit" id="login-btn">LOG IN</button>
        </form>
        <p>회원가입하러 가기</p>
        <button type="text" id="login-to-signup-btn">SIGN UP</button>

        <!-- <CookieTest/> -->
        <!-- <a @click="getTest">get cookie</a><br />
          <a @click="setTest">set cookie</a><br />
          <a @click="resetTest">reset cookie</a><br /> -->
      </div>
    </div>
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
        username,
        password,
      };
      VueCookie.set("id", username);
      this.$store.dispatch("logIn", payload);
      // this.setTest();
      // this.$store.dispatch("setTest", username);
    },
    // getTest() {
    //   if (VueCookie.isKey("id")) {
    //     alert(VueCookie.get("id"));
    //   } else {
    //     alert("값 없음");
    //   }
    //   console.log(VueCookie);
    // },
    // setTest() {
    //   console.log(this.username);
    //   VueCookie.set("id", this.username);
    // },
    // resetTest() {
    //   alert("삭제됨");
    //   VueCookie.remove("id");
    // },
  },
};
</script>

<style>
/* input style 초기화 CSS는 SignUpView에 함께 있음 */

/* CSS적용 */
.login-page {
  width: 100%;
  height: calc(100vh - 50px);
}
.login-wrapper {
  width: 30%;
  min-width: 550px;
}
#login-form {
  width: 100%;
  padding-bottom: 50px;
  /* min-width: 550px; */
}
.login__input {
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.3); */
  padding: 10px 20px;
  margin-bottom: 13px;
  color: var(--main-text-color);
  font-size: 1.2rem;
}
.login__input:focus::placeholder {
  color: var(--main-text-color);
}
.login__input:focus {
  animation-name: border-focus;
  animation-duration: 450ms;
  animation-fill-mode: forwards;
}
@keyframes border-focus {
  from {
    box-shadow: none;
  }
  to {
    box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.3);
  }
}
</style>
