<template>
  <div>
    <section className="row">
      <h2>{{ title }}</h2>
      <div class="slider">
        <div class="slider__arrow-left">
          <span class="arrow" @click="slideLeft">
            <i class="fa-solid fa-less-than"></i>
          </span>
        </div>
      </div>
      <div :id="this.id" class="row__posters">
        <img
          v-for="movie in this.movies"
          :key="movie.id"
          :class="`row__poster ${isLargeRow && row__posterLarge}`"
          :src="`${baseUrlTMDBImg}${
            isLargeRow ? movie.poster_path : movie?.backdrop_path
          } `"
          :alt="movie.name"
          @click="handleMovieClick(movie)"
        />
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
  name: "MovieRow",
  props: {
    title: String,
    id: String,
    fetchUrl: String,
    isLargeRow: Boolean,
  },
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    baseUrlTMDBImg() {
      return this.$store.state.baseUrlTMDBImg;
    },
  },
  methods: {
    slideLeft() {
      document.getElementById(this.id).scrollLeft -= window.innerWidth - 80;
    },
    slideRight() {
      document.getElementById(this.id).scrollLeft += window.innerWidth - 80;
    },
    handleMovieClick(movie) {
      this.$store.dispatch("handleMovieClick", movie);
    },
  },
  created() {
    let baseURL = this.$store.state.baseUrlTMDB;
    if (this.id === "MR") {
      baseURL = this.$store.state.baseUrlLocalServer;
    }

    axios({
      method: "get",
      url: `${baseURL}${this.fetchUrl}`,
      params: this.$store.state.paramsTMDB,
    })
      .then((res) => {
        this.movies = res.data.results || res.data;
        // this.movies = res.data;
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style>
.row {
  margin-left: 20px;
  color: white;
}
h2 {
  padding-left: 20px;
}
.slider {
  position: relative;
}
.slider__arrow-left {
  background-clip: content-box;
  padding: 20px 0;
  box-sizing: border-box;
  transition: 400ms all ease-in-out;
  cursor: pointer;
  width: 80px;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
}
.slider__arrow-right {
  padding: 20px 0;
  background-clip: content-box;
  box-sizing: border-box;
  transition: 400ms all ease-in-out;
  cursor: pointer;
  width: 80px;
  z-index: 1000;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
}
.arrow {
  transition: 400ms all ease-in-out;
}
.arrow:hover {
  transition: 400ms all ease-in-out;
  transform: scale(1.5);
}
.slider:hover .slider__arrow-left {
  transition: 400ms all ease-in-out;
  visibility: visible;
}
.slider:hover .slider__arrow-right {
  transition: 400ms all ease-in-out;
  visibility: visible;
}
.slider__arrow-left:hover {
  background: rgba(20, 20, 20, 0.5);
  transition: 400ms all ease-in-out;
}
.slider__arrow-right:hover {
  background: rgba(20, 20, 20, 0.5);
  transition: 400ms all ease-in-out;
}

.row__posters {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;
}
.row__posters::-webkit-scrollbar {
  display: none;
}
.row__posterLarge {
  max-height: 250px;
}
.row__poster {
  object-fit: contain;
  width: 100%;
  max-height: 144px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;
  margin-bottom: 10px;
}
.row__poster:hover {
  transform: scale(1.08);
}
/* .row__posterLarge {
  max-height: 320px;
} */
/* .row__posterLarge:hover {
  transform: scale(1.1);
  opacity: 1;
} */

.row__arrow-left {
  position: absolute;
  top: 0;
  left: 20px;
  height: 100%;
  width: 32px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}
.row__arrow-right {
  position: absolute;
  top: 0;
  right: 0px;
  height: 100%;
  width: 32px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}
</style>
