<template>
  <div>
    <h1>profile config page</h1>
    <form
      @submit.prevent="profileUpdate"
      id="config-form"
      class="d-flex flex-column"
    >
      <!-- <div>
        <label for="config-username">username: </label>
        <input
          type="text"
          id="config-username"
          class="config__input"
          v-model="name"
        />
      </div> -->
      <div>
        <label for="config-nickname">nickname: </label>
        <input
          type="text"
          id="config-nickname"
          class="config__input"
          v-model="nickname"
        />
      </div>
      <div>
        <label for="config-age">age: </label>
        <input type="age" id="config-age" class="config__input" v-model="age" />
      </div>
      <button type="submit" id="config-btn">변경사항 저장</button>
    </form>
    <button>비밀번호 변경</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfileConfig",
  data() {
    return {
      username: null,
      nickname: null,
      age: null,
    };
  },
  // props: {
  //   username: String,
  // },
  methods: {
    profileUpdate() {
      const username = this.username;
      const nickname = this.nickname;
      const age = this.age;

      const payload = { username, nickname, age };

      this.$store.dispatch("profileUpdate", payload);
      this.getUserProfile();
    },
    getUserProfile() {
      axios({
        method: "get",
        url: `${this.$store.state.baseUrlLocalServer}/profile/${this.$route.params.username}/`,
      })
        .then((res) => {
          console.log("get user", res);
          this.username = res.data.username;
          this.nickname = res.data.nickname;
          this.age = res.data.age;
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
