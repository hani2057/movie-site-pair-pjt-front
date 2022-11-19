import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 유저 관련
    token: null,

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
    SAVE_TOKEN(state, token) {
      state.token = token;
      // router.push({ name: "ArticleView" });
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
      axios({
        method: "post",
        url: `${context.state.baseUrlLocalServer}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
          nickname: payload.nickname,
          age: payload.age,
        },
      }).then((res) => {
        // console.log(res)
        context.commit("SAVE_TOKEN", res.data.key);
      }).catch((err)=>{
        console.log(err)
      });
    },

    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${context.state.baseUrlLocalServer}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res)=> {
          console.log(res)
          alert('로그인성공')
          context.commit('SAVE_TOKEN', res.data.key)
        }).catch((err)=>{
          alert('로그인실패')
          console.log(err)
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
