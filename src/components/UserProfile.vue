<template>
  <div>
    <div>
      <h1>{{ user?.nickname }}</h1>
      <p>ID: {{ user?.username }}</p>
      <!-- <p>{{ user?.username }}</p> -->
      <!-- <p>{{ user.first_name }}</p> -->
      <!-- <p>{{ user.lsst_name }}</p> -->
      <!-- <p>{{ user.email }}</p> -->
      <!-- <p>NICKNAME: {{ user?.nickname }}</p> -->
      <p>AGE:{{ user?.age }}</p>
      <!-- <p>{{ user }}</p> -->
    </div>
    <div>
      <span>My Lists</span>
      <div v-for="list in singleUserMyLists" :key="list.id">
        {{ list.title }}
        {{ list }}
        <div v-for="movieId in list.movie" :key="`${list.title}-${movieId}`">
          <img
            :src="`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=1c2f0f92339bff124d15c1fa1db21c85`"
            :alt="movieId"
          />
        </div>
      </div>
      {{ singleUserMyLists }}
    </div>
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
  computed: {
    singleUserMyLists() {
      return this.$store.state.singleUserMyLists;
    },
  },
  props: {
    username: String,
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
  created() {
    this.getUserProfile();
    this.$store.dispatch("getSingleUserMyLists");
  },
};
</script>

<style></style>
