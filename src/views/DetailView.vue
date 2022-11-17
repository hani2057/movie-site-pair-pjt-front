<template>
  <div>
    <div
      class="single-movie-wrapper"
      :style="{
        backgroundImage: `${this.bgImgLinearGradient}, url(${baseUrlTMDBImg}${movieData.backdrop_path})`,
      }"
    >
      <!-- <img :src="`${baseUrlTMDBImg}${movieData.poster_path}`" /> -->
    </div>
    {{ movieData }}
  </div>
</template>

<script>
export default {
  name: "DetailView",
  data() {
    return {
      bgImgLinearGradient:
        "linear-gradient(to right, rgba(0, 0, 0, 1), 75%, rgba(0, 0, 0, 0.3))",
    };
  },
  computed: {
    movieData() {
      return this.$store.state.singleMovieData;
    },
    baseUrlTMDBImg() {
      return this.$store.state.baseUrlTMDBImg;
    },
  },
  created() {
    const movieId = this.$route.params.id;
    this.$store.dispatch("getSingleMovieData", movieId);
  },
};
</script>

<style>
.single-movie-wrapper {
  width: 90%;
  height: 90vh;
  margin: 50px;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)); */
  background-size: cover;
  background-position: center;
  object-fit: cover;
  /* background-image: url(`${baseUrlTMDBImg}${movieData.backdrop_path}`); */
}
</style>
