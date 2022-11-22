import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

import router from "@/router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
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
    singleMovieReviews: [],
    // // 영화 장르
    movieGenres: {
      12: "모험",
      14: "판타지",
      16: "애니메이션",
      18: "드라마",
      27: "공포",
      28: "액션",
      35: "코미디",
      36: "역사",
      37: "서부",
      53: "스릴러",
      80: "범죄",
      99: "다큐멘터리",
      878: "SF",
      9648: "미스터리",
      10402: "음악",
      10749: "로맨스",
      10751: "가족",
      10752: "전쟁",
      10770: "TV 영화",
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    singleMovieDataGenres(state) {
      // console.log(state.singleMovieData);
      const singleMovieDataGenres = [];
      if (state.singleMovieData.genres) {
        for (const genreObject of state.singleMovieData.genres) {
          singleMovieDataGenres.push(genreObject.name);
        }
        return singleMovieDataGenres;
      }

      for (const genre_id of state.singleMovieData.genre_ids) {
        singleMovieDataGenres.push(state.movieGenres[genre_id]);
      }

      return singleMovieDataGenres;
    },
    // isModalOpened(state) {
    //   return state.isModalOpened;
    // },
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token;
    },
    DELETE_TOKEN(state) {
      state.token = null;
      router.push({ name: "main" });
    },
    // CHANGE_LOG_IN_STATE(state) {
    //   state.isLoggedIn = !state.isLoggedIn;
    // },
    CHANGE_MODAL_OPEN_STATE(state) {
      state.isModalOpened = !state.isModalOpened;
    },
    SET_SINGLE_MOVIE_DATA(state, singleMovieData) {
      state.singleMovieData = singleMovieData;
    },
    SET_SINGLE_MOVIE_REVIEWS(state, singleMovieReviews) {
      state.singleMovieReviews = singleMovieReviews;
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
          router.push({ name: "login" });
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
          // context.commit("CHANGE_LOG_IN_STATE");
          router.push({ name: "main" });
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
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          alert("로그아웃성공");
          context.commit("DELETE_TOKEN");
          // context.commit("CHANGE_LOG_IN_STATE");
        })
        .catch((err) => {
          alert("로그아웃실패");
          console.log(err);
        });
    },

    // Movie Modal 관련
    handleMovieClick(context, singleMovieData) {
      context.dispatch("getSingleMovieReviews", singleMovieData.id);
      context.commit("CHANGE_MODAL_OPEN_STATE");
      context.commit("SET_SINGLE_MOVIE_DATA", singleMovieData);
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
    getSingleMovieReviews(context, movieId) {
      axios({
        method: "get",
        url: `${context.state.baseUrlLocalServer}/movies/detail/${movieId}/comment/`,
      })
        .then((res) => {
          console.log("리뷰", res);
          context.commit("SET_SINGLE_MOVIE_REVIEWS", res.data);
        })
        .catch((err) => console.error(err));
    },
    postSingleMovieReview(context, payload) {
      const { content, score, movieId } = payload;
      axios({
        method: "post",
        url: `${context.state.baseUrlLocalServer}/movies/detail/${movieId}/comment/`,
        data: { content, score },
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then(() => {
          // console.log(res);
          context.dispatch("getSingleMovieReviews", movieId);
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {},
});

export default store;
