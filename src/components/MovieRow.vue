<template>
  <div>
    <section className="row">
      <h2>{{ title }}</h2>
      <div class="slider">
        <div class="slider__arrow-left" @click="slideLeft">
          <span class="arrow">
            <i class="fa-solid fa-less-than"></i>
          </span>
        </div>

        <div :id="this.id" class="row__posters px-4">
          <div
            v-for="movie in this.movies"
            :key="movie.id"
            :class="[isLargeRow ? 'row__posterLargeDiv' : 'row__posterDiv']"
            @click="handleMovieClick(movie)"
          >
            <img
              class="row__poster"
              :src="`${baseUrlTMDBImg}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              } `"
              :alt="movie.name"
            />
            <span class="row__posterTitle">{{ movie.title }}</span>
          </div>
        </div>

        <div class="slider__arrow-right" @click="slideRight">
          <span class="arrow">
            <i class="fa-solid fa-greater-than"></i>
          </span>
        </div>
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
.slider__arrow-left,
.slider__arrow-right {
  background-clip: content-box;
  padding: 20px 0;
  box-sizing: border-box;
  transition: 400ms all ease-in-out;
  cursor: pointer;
  width: 50px;
  height: 50px;
  z-index: 100;
  border-radius: 50%;
  background: rgba(20, 20, 20, 0.7);
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* visibility: hidden; */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.slider__arrow-left {
  left: 0;
}
.slider__arrow-right {
  right: 0;
}
.arrow:hover {
  transition: 400ms all ease-in-out;
  transform: scale(1.5);
}
/* .slider:hover .slider__arrow-left,
.slider:hover .slider__arrow-right {
  transition: 400ms all ease-in-out;
  visibility: visible;
} */
/* .slider__arrow-left:hover,
.slider__arrow-right:hover {
  background: rgba(20, 20, 20, 0.5);
  transition: 400ms all ease-in-out;
} */
.row__posters {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  /* padding: 20px 0 20px 20px; */
  scroll-behavior: smooth;
}
.row__posters::-webkit-scrollbar {
  display: none;
}
.row__posterDiv,
.row__posterLargeDiv {
  display: inline-block;
  position: relative;
  /* flex-basis: 100%; */
  flex-shrink: 0;
  max-width: 250px;
  max-height: 144px;
  overflow: hidden !important;
  margin-right: 25px;
  border-radius: 6px;
}
.row__posterLargeDiv {
  max-width: 160px;
  max-height: 300px;
  margin-right: 30px;
}
.row__poster {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.row__posterTitle {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  z-index: 20;
  font-weight: 600;
  text-align: center;
  /* font-size: 20px; */
  transform: translate(-50%, -50%);
  transition: all ease-out 450ms;
}
.row__posterDiv:hover:after,
.row__posterLargeDiv:hover:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  cursor: pointer;
}
.row__posterDiv:hover > .row__poster,
.row__posterLargeDiv:hover > .row__poster {
  transform: scale(1.2);
  transition: all ease-in-out 450ms;
}
.row__posterDiv:hover > .row__posterTitle,
.row__posterLargeDiv:hover > .row__posterTitle {
  opacity: 1;
  align-self: center;
  cursor: pointer;
}

/*
@media screen and (min-width: 1200px) {
  .row__poster {
    max-height: 160px;
  }
  .row__posterLarge {
    max-height: 360px;
  }
}
@media screen and (max-width: 768px) {
  .row__poster {
    max-height: 100px;
  }
  .row__posterLarge {
    max-height: 280px;
  }
}

.swiper-pagination {
  text-align: right !important;
}

.swiper-pagination-bullet {
  background: gray !important;
  opacity: 1 !important;
}

.swiper-pagination-bullet-active {
  background: white !important;
}

.swiper-button-prev {
  color: white !important;
}

.swiper-button-next {
  color: white !important;
}

.swiper-button-next:after, .swiper-button-prev:after{
  font-size: 1.3rem !important;
  font-weight: 600 !important;
} */
</style>
