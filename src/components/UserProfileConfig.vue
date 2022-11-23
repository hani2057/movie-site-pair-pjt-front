<template>
  <div>
    <h1>profile config page</h1>
    <form
      @submit.prevent="profileUpdate"
      id="config-form"
      class="d-flex flex-column"
    >
      <input
        type="text"
        id="config-username"
        class="config__input"
        v-model="name"
      />
      <!-- <input
        type="password"
        id="config-password1"
        class="config__input"
        v-model="password"
      /> -->
      <!-- <input
        type="password"
        id="config-password2"
        class="config__input"
        v-model="password2"
      /> -->
      <input
        type="nickname"
        id="config-nickname"
        class="config__input"
        :value="nickname"
      />
      <!-- v-model="nickname" -->
      <!-- <input type="age" id="config-age" class="config__input" v-model="age" /> -->
      <button type="submit" id="config-btn">변경사항 저장</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfileConfig",
  data() {
    return {
      user: null,
    };
  },
  // props: {
  //   username: String,
  // },
  computed: {
    name: this.user.username,
    // password: this.user.password,
    nickname: this.user.nickname,
    // age: this.user.age,
  },
  methods: {
    profileUpdate() {},
    getUserProfile() {
      axios({
        methods: "get",
        url: `${this.$store.state.baseUrlLocalServer}/profile/${this.$route.params.username}`,
      })
        .then((res) => {
          console.log("get user", res);
          this.user = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getUserProfile();
  },
};
</script>

<style></style>
