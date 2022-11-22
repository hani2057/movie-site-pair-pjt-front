import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 유저 관련
    token: null,

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
    SAVE_TOKEN(state, token) {
      state.token = token;
      router.push({ name: "main" });
    },
    DELETE_TOKEN(state) {
      state.token = null;
      router.push({ name: "main" });
    },
    CHANGE_MODAL_OPEN_STATE(state) {
      state.isModalOpened = !state.isModalOpened;
    },
    SET_SINGLE_MOVIE_DATA(state, singleMovieData) {
      state.singleMovieData = singleMovieData;
    },
  },
  actions: {
    signUp(context, payload) {
      const { username, password1, password2, nickname, age } = payload;

      axios({
        method: "post",
        url: `${context.state.baseUrlLocalServer}/accounts/signup/`,
        data: {
          username,
          password1,
          password2,
          nickname,
          age,
        },
      })
        .then((res) => {
          // console.log(res)
          context.commit("SAVE_TOKEN", res.data.key);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logIn(context, payload) {
      const { username, password } = payload;

      axios({
        method: "post",
        url: `${context.state.baseUrlLocalServer}/accounts/login/`,
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          alert("로그인성공");
          context.commit("SAVE_TOKEN", res.data.key);
        })
        .catch((err) => {
          alert("로그인실패");
          console.error(err);
        });
    },

    logOut(context) {
      axios({
        method: "post",
        url: `${context.state.baseUrlLocalServer}/accounts/logout/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          alert("로그아웃성공");
          context.commit("DELETE_TOKEN");
        })
        .catch((err) => {
          alert("로그아웃실패");
          console.log(err);
        });
    },

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
