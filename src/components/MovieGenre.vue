<template>
  <div>
    <section className="row">
      <h3>{{ title }}</h3>
      <div class="slider">
        <div class="slider__arrow-left">
          <span class="arrow" @click="slideLeft">
            <i class="fa-solid fa-less-than"></i>
          </span>
        </div>
      </div>
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
              <img
                :class="`row__poster ${isLargeRow && row__posterLarge}`"
                :src="`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `"
                :alt="movie.name"
                @click="handleClick(movie)"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="slider__arrow-right">
        <span class="arrow" @click="slideRight">
          <i class="fa-solid fa-greater-than"></i>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

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
    slideLeft() {
      document.getElementById(this.id).scrollLeft -= window.innerWidth - 80;
    },
    slideRight() {
      document.getElementById(this.id).scrollLeft += window.innerWidth - 80;
    },
    handleClick(movie) {
      this.$router.push({ name: "detail", params: { id: movie.id } });
    },
  },
  created() {
    const baseURL = this.$store.state.baseUrlTMDB;

    axios({
      method: "get",
      url: `${baseURL}${this.fetchUrl}`,
      params: this.$store.state.paramsTMDB,
    })
      .then((res) => {
        this.movies = res.data.results;
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style></style>
