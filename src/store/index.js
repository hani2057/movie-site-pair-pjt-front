import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrlTMDB: "https://api.themoviedb.org/3",
    paramsTMDB: {
      // api_key: process.env.MOVIE_DB_API_KEY,
      api_key: "1c2f0f92339bff124d15c1fa1db21c85",
      language: "ko-KR",
    },
    baseUrlLocalServer: "http://127.0.0.1:8000",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
