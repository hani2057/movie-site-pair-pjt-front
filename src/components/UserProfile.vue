<template>
  <div>
    <div>
      <h1>{{ user?.nickname }}</h1>
      <p>@ {{ user?.username }}</p>
      <!-- <p>{{ user?.username }}</p> -->
      <!-- <p>{{ user.first_name }}</p> -->
      <!-- <p>{{ user.lsst_name }}</p> -->
      <!-- <p>{{ user.email }}</p> -->
      <!-- <p>NICKNAME: {{ user?.nickname }}</p> -->
      <p>AGE:{{ user?.age }}</p>
      <p>나이에 따라 성인이면 어떤 이모지 미성년이면 어떤 이모지 표시</p>
      <!-- <p>{{ user }}</p> -->
    </div>
    <div>
      <span>My Lists</span>
      <hr />
      <div v-for="list in singleUserMyLists" :key="list.id">
        {{ list.title }}
        <button @click="deleteMyList(list.id)">리스트삭제</button>
        {{ list }}
        <div v-for="movieId in list.movies" :key="`${list.title}-${movieId}`">
          <img
            :src="`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=1c2f0f92339bff124d15c1fa1db21c85`"
            :alt="movieId"
          />
          <button @click="deleteSingleMovieFromList(list.id, movieId)">
            영화 삭제
          </button>
        </div>
      </div>
    </div>
    <hr />
    {{ singleUserMyLists }}
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
  watch: {
    singleUserMyLists(val) {
      console.log("watch", val);
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
    deleteMyList(listId) {
      this.$store.dispatch("deleteMyList", listId);
    },
    deleteSingleMovieFromList(listId, movieId) {
      const payload = { listId, movieId };
      this.$store.dispatch("deleteSingleMovieFromList", payload);
    },
  },
  created() {
    this.getUserProfile();
    this.$store.dispatch("getSingleUserMyLists");
  },
};
</script>

<style></style>
