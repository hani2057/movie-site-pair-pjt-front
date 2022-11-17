<template>
  <div>
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username" /><br />

      <label for="password1"> password : </label>
      <input type="password" id="password1" v-model="password1" /><br />

      <label for="password2"> password confirmation : </label>
      <input type="password" id="password2" v-model="password2" />

      <label for="nickname"> nickname : </label>
      <input type="nickname" id="nickname" v-model="nickname" /><br />

      <label for="age"> age : </label>
      <input type="age" id="age" v-model="age" /><br />

      <input type="submit" value="SignUp" />
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpView",

  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      nickname: null,
      age: null,
    };
  },
  methods: {
    signUp() {
      const username = this.username;
      const password1 = this.password1;
      const password2 = this.password2;
      const nickname = this.nickname;
      const age = this.age;

      const payload = {
        username,
        password1,
        password2,
        nickname,
        age,
      };
      this.$store.dispatch("signUp", payload);
    },
  },
};
</script>

<style></style>
