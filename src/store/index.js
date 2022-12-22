import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import VueCookie from "vue-cookies";

import router from "@/router/index";
import { localApi } from "@/api/requests.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    // 유저 관련
    token: null,
    isLoggedIn: false,
    isUserAdult: false,
    username: null,

    // http request 관련
    baseUrlTMDB: "https://api.themoviedb.org/3",
    paramsTMDB: {
      // api_key: process.env.MOVIE_DB_API_KEY,
      api_key: process.env.VUE_APP_TMDB_API_KEY,
      language: "ko-KR",
    },
    paramsTMDBVideo: {
      api_key: process.env.VUE_APP_TMDB_API_KEY,
    },
    baseUrlLocalServer: "http://127.0.0.1:8000",
    baseUrlTMDBImg: "https://image.tmdb.org/t/p/original/",

    // single movie detail modal 관련
    isModalOpened: false,
    singleMovieData: {},
    singleMovieReviews: [],

    // my lists 관련
    singleUserMyLists: [],

    // 장르
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
    // isLoggedIn(state) {
    //   return !!state.token;
    // },
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
    // 유저 관련
    SAVE_TOKEN(state, token) {
      state.token = token;
    },
    DELETE_TOKEN(state) {
      state.token = null;
      router.push({ name: "main" });
    },
    SAVE_USERNAME(state, username) {
      state.username = username;
    },
    DELETE_USERNAME(state) {
      state.username = null;
    },
    CHANGE_LOG_IN_STATE(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },

    //
    // 디테일 모달 관련
    //
    // 모달창 열고 닫기
    CHANGE_MODAL_OPEN_STATE(state) {
      state.isModalOpened = !state.isModalOpened;
    },
    // 현재 선택된 영화 정보를 저장
    SET_SINGLE_MOVIE_DATA(state, singleMovieData) {
      state.singleMovieData = singleMovieData;
    },
    // 현재 선택된 영화에 달린 리뷰 정보를 가져와 저장
    SET_SINGLE_MOVIE_REVIEWS(state, singleMovieReviews) {
      state.singleMovieReviews = singleMovieReviews;
    },
    // 현재 선택된 영화에 달린 리뷰를 삭제
    // 수정요
    // DELETE_SINGLE_MOVIE_REVIEWS(state) {
    //   state.singleMovieReviews = [];
    // },

    //
    // 마이리스트 관련
    //
    // 유저의 my list들을 가져옴
    SET_SINGLE_USER_MY_LISTS(state, singleUserMyLists) {
      state.singleUserMyLists = singleUserMyLists;
    },
    // 새로운 my list를 만듦
    MAKE_SIGLE_MY_LIST(state, newMyList) {
      state.singleUserMyLists.push(newMyList);
    },
    // listId에 해당하는 my list 삭제
    DELETE_SINGLE_MY_LIST(state, listId) {
      state.singleUserMyLists = state.singleUserMyLists.filter(
        (list) => list.id !== listId
      );
    },
    // listId에 해당하는 my list에서 movieId에 해당하는 영화 삭제
    DELETE_SINGLE_MOVIE_FROM_LIST(state, payload) {
      const { listId, movieId } = payload;
      state.singleUserMyLists = [...state.singleUserMyLists].map((list) => {
        if (list.id === listId) {
          list.movies = list.movies.filter((id) => id !== movieId);
        }
        return list;
      });
    },
  },

  actions: {
    async signUp(context, payload) {
      const { data } = await localApi.signUp(payload);
      console.log(data);

      // const {
      //   username,
      //   password1,
      //   password2,
      //   nickname,
      //   age,
      //   genre_pick_1,
      //   genre_pick_2,
      // } = payload;

      // console.log(genre_pick_1, genre_pick_2);

      // axios({
      //   method: "post",
      //   url: `${context.state.baseUrlLocalServer}/accounts/signup/`,
      //   data: {
      //     username,
      //     password1,
      //     password2,
      //     nickname,
      //     age,
      //     genre_pick_1,
      //     genre_pick_2,
      //   },
      // })
      // localApi
      //   .signUp(payload)
      //   .then((res) => {
      //     // console.log(res)
      //     context.commit("SAVE_TOKEN", res.data.key);
      //     router.push({ name: "login" });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
          // alert("로그인성공");
          context.commit("SAVE_TOKEN", res.data.key);
          context.commit("SAVE_USERNAME", username);
          context.commit("CHANGE_LOG_IN_STATE");
          router.push({ name: "main" });
        })
        .catch((err) => {
          // alert("로그인실패");
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
        .then(() => {
          // alert("로그아웃성공");
          VueCookie.remove("id");
          context.commit("DELETE_TOKEN");
          context.commit("DELETE_USERNAME");
          context.commit("CHANGE_LOG_IN_STATE");
        })
        .catch((err) => {
          // alert("로그아웃실패");
          console.log(err);
        });
    },
    profileUpdate(context, payload) {
      const { username, nickname, age } = payload;
      axios({
        method: "put",
        url: `${context.state.baseUrlLocalServer}/profile/${username}/`,
        data: {
          username,
          nickname,
          age,
        },
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then(() => {
          console.log(1);
          router.push({ name: "profile" });
        })
        .catch((err) => {
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
          // console.log(res);
        })
        .catch((err) => console.error(err));
    },
    getSingleMovieReviews(context, movieId) {
      // context.state.singleMovieReviews = [];
      axios({
        method: "get",
        url: `${context.state.baseUrlLocalServer}/movies/detail/${movieId}/comment/`,
      })
        .then((res) => {
          // console.log("리뷰", res);
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

    // My Lists 관련
    getSingleUserMyLists(context) {
      const username = context.state.username;

      axios({
        method: "get",
        url: `${context.state.baseUrlLocalServer}/list/recommend_movie_list/${username}`,
      })
        .then((res) => {
          console.log("get sigle user's lists", res);
          context.commit("SET_SINGLE_USER_MY_LISTS", res.data);
        })
        .catch((err) => console.error(err));
    },
    makeNewMyList(context, listTitle) {
      axios({
        method: "post",
        url: `${context.state.baseUrlLocalServer}/list/recommend_movie_list_create/`,
        data: {
          title: listTitle,
        },
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          context.commit("MAKE_SIGLE_MY_LIST", res.data);
        })
        .catch((err) => console.error(err));
    },
    deleteMyList(context, listId) {
      axios({
        method: "delete",
        url: `${context.state.baseUrlLocalServer}/list/recommend_movie_list_delete/${listId}/`,
      })
        .then((res) => {
          context.commit("DELETE_SINGLE_MY_LIST", listId);
          console.log(res);
        })
        .catch((err) => console.error(err));
    },
    deleteSingleMovieFromList(context, payload) {
      const { listId, movieId } = payload;
      axios({
        method: "get",
        url: `${context.state.baseUrlLocalServer}/list/recommend_movie_delete/${listId}/${movieId}/`,
      })
        .then((res) => {
          console.log("delete", res);
          console.log(payload);
          context.commit("DELETE_SINGLE_MOVIE_FROM_LIST", payload);
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {},
});

export default store;
