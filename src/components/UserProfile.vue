<template>
  <div>
    <h1>Profile</h1>
    <p>아이디 : {{ user?.email }}</p>
    <p>{{ user.username }}</p>
    <p>{{ user.first_name }}</p>
    <p>{{ user.lsst_name }}</p>
    <p>{{ user.email }}</p>
    <p>{{ user.nick_name }}</p>
    <p>{{ user.age }}</p>
    <p>{{ user }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      user: null,
    };
  },
  props: {
    username: String,
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      axios({
        methods: "get",
        url: `${this.$store.state.baseUrlLocalServer}/profile/${this.$route.params.username}`,
      })
        .then((res) => {
          // console.log(res);
          this.user = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
