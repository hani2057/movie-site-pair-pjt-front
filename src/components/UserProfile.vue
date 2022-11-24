<template>
  <div>
    <div class="profile-wrapper px-4">
      <div>
        <h1 id="profile-nickname">{{ user?.nickname }}</h1>
        <div class="d-flex">
          <p>@ {{ user?.username }}</p>
          <i
            class="fa-solid fa-user-plus pt-1 ps-1"
            v-show="user?.age > 19"
          ></i>
          <i
            class="fa-solid fa-user-shield pt-1 ps-1"
            v-show="user?.age <= 19"
          ></i>
        </div>
        <!-- <p>{{ user?.username }}</p> -->
        <!-- <p>{{ user.first_name }}</p> -->
        <!-- <p>{{ user.lsst_name }}</p> -->
        <!-- <p>{{ user.email }}</p> -->
        <!-- <p>NICKNAME: {{ user?.nickname }}</p> -->
        <!-- <p>AGE:{{ user?.age }}</p>
        <p>나이에 따라 성인이면 어떤 이모지 미성년이면 어떤 이모지 표시</p> -->
        <!-- <p>{{ user }}</p> -->
      </div>
      <div>
        <hr />
        <h3 class="my-4">My Lists</h3>
        <div
          v-for="(list, listIdx) in singleUserMyLists"
          :key="list.id"
          class="profile-mylists"
        >
          <div class="d-flex align-items-center">
            <h4>{{ list.title }}</h4>
            <!-- <button @click="deleteMyList(list.id)">리스트삭제</button> -->
            <span @click="deleteMyList(list.id)">
              <i
                class="fa-regular fa-trash-can ps-2 profile-mylists__list-delete-icon"
              ></i>
              <!-- <i class="fa-solid fa-circle-xmark"></i> -->
            </span>
          </div>
          <!-- {{ list }} -->
          <div class="d-flex">
            <div
              v-for="(movieId, movieIdx) in list.movies"
              :key="`${list.title}-${movieId}`"
            >
              <!-- {{ listIdx }} {{ movieIdx }} -->
              <div class="d-flex flex-column me-2 profile-mylists__movie">
                <img
                  :src="`${$store.state.baseUrlTMDBImg}${movieDetails[listIdx][movieIdx].posterPath}`"
                  alt="movie poster"
                  class="profile-mylists__movie-poster"
                />
                <span class="profile-mylists__movie-title">{{
                  movieDetails[listIdx][movieIdx].title
                }}</span>
                <span
                  @click="deleteSingleMovieFromList(list.id, movieId)"
                  class="profile-mylists__movie-delete-icon"
                >
                  <i class="fa-regular fa-circle-xmark"></i>
                </span>
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

export default {
  name: "UserProfile",
  data() {
    return {
      user: null,
      movieDetails: [],
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
    if (!this.$store.state.singleUserMyLists) {
      this.$store.dispatch("getSingleUserMyLists");
    }
  },
  mounted() {
    // (function () {
    //   while (!this.singleUserMyLists) {
    //     let i = 0;
    //     console.log(i);
    //   }
    // })();
    const singleUserMyLists = this.singleUserMyLists;
    // console.log("single", singleUserMyLists);
    // console.log("store", this.$store.state.singleUserMyLists);
    const movieDetails = [];
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
      movieDetails.push(tempMovieDetails);
    }
    this.movieDetails = movieDetails;
  },
};
</script>

<style>
.profile-wrapper {
  min-height: calc(100vh - 100px);
}
#profile-nickname {
  font-size: 3.5rem;
}
.profile-mylists {
  margin-bottom: 20px;
}
.profile-mylists__list-delete-icon {
  cursor: pointer;
}
.profile-mylists__movie {
  position: relative;
}
.profile-mylists__movie-poster {
  width: 80px;
  height: 120px;
}
.profile-mylists__movie-title {
  width: 80px;
  font-size: 0.8rem;
  text-align: center;
}
.profile-mylists__movie-delete-icon {
  position: absolute;
  top: 3px;
  right: 3px;
  color: rgb(188, 18, 18);
  cursor: pointer;
  font-size: 1.2rem;
  display: none;
}
.profile-mylists__movie:hover .profile-mylists__movie-delete-icon {
  display: block;
}
</style>
