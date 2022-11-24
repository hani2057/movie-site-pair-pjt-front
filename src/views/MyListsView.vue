<template>
  <div class="component-wrapper">
    <div class="mylist-wrapper px-4">
      <!-- <SearchBar /> -->
      <div>
        <h2>내 My Lists</h2>
        <div
          v-for="(list, listIdx) in singleUserMyLists"
          :key="list.id"
          class="mylists-user"
        >
          <div class="d-flex align-items-center">
            <h4>{{ list.title }}</h4>
          </div>
          <!-- {{ list }} -->
          <div class="d-flex mylists-user__list-content">
            <div
              v-for="(movieId, movieIdx) in list.movies"
              :key="`${list.title}-${movieId}`"
            >
              <!-- {{ listIdx }} {{ movieIdx }} -->
              <div class="d-flex flex-column me-2 profile-mylists__movie">
                <img
                  :src="`${$store.state.baseUrlTMDBImg}${userMovieDetails[listIdx][movieIdx].posterPath}`"
                  alt="movie poster"
                  class="mylists-user__movie-poster"
                />
                <span class="mylists-user__movie-title">
                  {{ userMovieDetails[listIdx][movieIdx].title }}
                </span>
                <!-- <span
                  @click="deleteSingleMovieFromList(list.id, movieId)"
                  class="profile-mylists__movie-delete-icon"
                >
                  <i class="fa-regular fa-circle-xmark"></i>
                </span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div
          v-for="(list, listIdx) in allMyLists"
          :key="list.id"
          class="mylists-user"
        >
          <div class="d-flex align-items-center">
            <h4>{{ list.title }}</h4>
          </div>
          <!-- {{ list }} -->
          <div class="d-flex mylists-user__list-content">
            <div
              v-for="(movieId, movieIdx) in list.movies"
              :key="`all-${list.title}-${movieId}`"
            >
              <!-- {{ listIdx }} {{ movieIdx }} -->
              <div class="d-flex flex-column me-2 profile-mylists__movie">
                <img
                  :src="`${$store.state.baseUrlTMDBImg}${allMovieDetails[listIdx][movieIdx].posterPath}`"
                  alt="movie poster"
                  class="mylists-user__movie-poster"
                />
                <span class="mylists-user__movie-title">
                  {{ allMovieDetails[listIdx][movieIdx].title }}
                </span>
                <!-- <span
                  @click="deleteSingleMovieFromList(list.id, movieId)"
                  class="profile-mylists__movie-delete-icon"
                >
                  <i class="fa-regular fa-circle-xmark"></i>
                </span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import SearchBar from "@/components/SearchBar";

export default {
  name: "MyListsView",
  data() {
    return {
      allMyLists: [],
      allMovieDetails: [],
      userMovieDetails: [],
    };
  },
  computed: {
    singleUserMyLists() {
      return this.$store.state.singleUserMyLists;
    },
  },
  watch: {
    singleUserMyLists() {},
  },
  props: {
    username: String,
  },

  methods: {
    getAllMyLists() {
      axios({
        method: "get",
        url: `${this.$store.state.baseUrlLocalServer}/list/recommend_movie_list/`,
      })
        .then((res) => {
          console.log("get all lists", res);
          this.allMyLists = res.data;
        })
        .catch((err) => console.error(err));
    },
  },
  components: {
    // SearchBar,
  },
  created() {
    this.getAllMyLists();
    if (!this.$store.state.singleUserMyLists) {
      this.$store.dispatch("getSingleUserMyLists");
    }

    // this.getSingleUserMyLists();
  },
  mounted() {
    const singleUserMyLists = this.singleUserMyLists;
    // console.log("single", singleUserMyLists);
    // console.log("store", this.$store.state.singleUserMyLists);
    const allMovieDetails = [];
    const userMovieDetails = [];

    for (const list of singleUserMyLists) {
      const tempMovieDetails = [];
      for (const movieId of list.movies) {
        axios({
          method: "get",
          url: `${this.$store.state.baseUrlTMDB}/movie/${movieId}`,
          params: this.$store.state.paramsTMDB,
        })
          .then((res) => {
            const posterPath = res.data.poster_path;
            const title = res.data.title;
            tempMovieDetails.push({ posterPath, title });
          })
          .catch((err) => console.error(err));
      }
      allMovieDetails.push(tempMovieDetails);
    }
    this.allMovieDetails = allMovieDetails;

    for (const list of singleUserMyLists) {
      const tempMovieDetails = [];
      for (const movieId of list.movies) {
        axios({
          method: "get",
          url: `${this.$store.state.baseUrlTMDB}/movie/${movieId}`,
          params: this.$store.state.paramsTMDB,
        })
          .then((res) => {
            const posterPath = res.data.poster_path;
            const title = res.data.title;
            tempMovieDetails.push({ posterPath, title });
          })
          .catch((err) => console.error(err));
      }
      userMovieDetails.push(tempMovieDetails);
    }
    this.userMovieDetails = userMovieDetails;
  },
};
</script>

<style>
.mylist-wrapper {
  min-height: calc(100vh - 100px);
}
.mylists-user {
  margin-bottom: 20px;
}
.mylists-user__list-delete-icon {
  cursor: pointer;
}
.mylists-user__movie {
  position: relative;
}
.mylists-user__movie-poster {
  width: 80px;
  height: 120px;
}
.mylists-user__movie-title {
  width: 80px;
  font-size: 0.8rem;
  text-align: center;
}
.mylists-user__movie-delete-icon {
  position: absolute;
  top: 3px;
  right: 3px;
  color: rgb(188, 18, 18);
  cursor: pointer;
  font-size: 1.2rem;
  display: none;
}
.mylists-user__movie:hover .mylists-user__movie-delete-icon {
  display: block;
}
</style>
