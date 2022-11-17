import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 공통 CONSTANTS
    BG_COLOR: "#19191c",
    TEXT_COLOR: "#dee1e4",

    // http request 관련
    baseUrlTMDB: "https://api.themoviedb.org/3",
    paramsTMDB: {
      // api_key: process.env.MOVIE_DB_API_KEY,
      api_key: "1c2f0f92339bff124d15c1fa1db21c85",
      language: "ko-KR",
    },
    paramsTMDBVideo: {
      api_key: "1c2f0f92339bff124d15c1fa1db21c85",
    },
    baseUrlLocalServer: "http://127.0.0.1:8000",
    baseUrlTMDBImg: "https://image.tmdb.org/t/p/original/",

    // single movie detail modal 관련
    isModalOpened: false,
    singleMovieData: {},
  },
  getters: {
    // isModalOpened(state) {
    //   return state.isModalOpened;
    // },
  },
  mutations: {
    CHANGE_MODAL_OPEN_STATE(state) {
      state.isModalOpened = !state.isModalOpened;
    },
    SET_SINGLE_MOVIE_DATA(state, singleMovieData) {
      state.singleMovieData = singleMovieData;
    },
  },
  actions: {
    getSingleMovieData(context, movieId) {
      axios({
        method: "get",
        url: `${context.state.baseUrlTMDB}/movie/${movieId}`,
        params: context.state.paramsTMDB,
      })
        .then((res) => {
          context.commit("SET_SINGLE_MOVIE_DATA", res.data);
          console.log(res);
        })
        .catch((err) => console.error(err));
    },
    handleMovieClick(context, singleMovieData) {
      context.commit("CHANGE_MODAL_OPEN_STATE");
      context.commit("SET_SINGLE_MOVIE_DATA", singleMovieData);
    },
  },
  modules: {},
});
