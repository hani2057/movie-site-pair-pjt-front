<template>
  <div>
    <h1>Profile</h1>
    <p>아이디 : {{ user?.email }}</p>
    <p>{{ user }}</p>
    <!-- <p>제목 : {{ article?.title }}</p>
    <p>내용 : {{ article?.content }}</p>
    <p>작성시간 : {{ article?.created_at }}</p>
    <p>수정시간 : {{ article?.updated_at }}</p> -->
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "ProfileView",
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      axios({
        methods: "get",
        url: `${API_URL}/profile/${this.$route.params.username}`,
      })
        .then((res) => {
          console.log(res);
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
