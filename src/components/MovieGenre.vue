<template>
  <div>
    <section className="row">
      <h3>{{ title }}</h3>

      <div :id="this.id" class="row__posters">
        <b-container fluid>
          <b-row>
            <b-col
              sm="6"
              md="4"
              lg="3"
              xl="2"
              v-for="movie in this.movies"
              :key="movie.id"
            >
              <div class="row__posterDiv mb-3" @click="handleMovieClick(movie)">
                <img
                  class="row__poster"
                  :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path} `"
                  :alt="movie.name"
                />
                <span class="row__posterTitle">{{ movie.title }}</span>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
import { movieInstance } from "@/api/axios";

export default {
  name: "MovieGenre",
  props: {
    title: String,
    id: String,
    fetchUrl: String,
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    handleMovieClick(movie) {
      this.$store.dispatch("handleMovieClick", movie);
    },
  },
  created() {
    // const baseURL = this.$store.state.baseUrlTMDB;
    const params = this.$store.state.paramsTMDB;

    movieInstance
      .get(`${this.fetchUrl}`, params)
      .then((res) => {
        console.log(res);
        this.movies = res.data.results || res.data;
      })
      .catch((err) => console.error(err));

    // axios({
    //   method: "get",
    //   url: `${baseURL}${this.fetchUrl}`,
    //   params: this.$store.state.paramsTMDB,
    // })
    //   .then((res) => {
    //     this.movies = res.data.results;
    //   })
    //   .catch((err) => console.error(err));
  },
};
</script>

<style></style>
