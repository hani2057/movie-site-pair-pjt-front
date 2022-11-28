import axios from "axios";
// import store from "@/store/index";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_IMG_URL: "https://image.tmdb.org/t/p/original/",

const LOCAL_BASE_URL = "http://127.0.0.1:8000";

const paramsTMDB = {
  api_key: process.env.VUE_APP_TMDB_API_KEY,
  language: "ko-KR",
};

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

const axiosAuthApi = (url, options) => {
  // const token = store.state.token;
  const instance = axios.create({
    baseURL: url,
    // headers: {
    //   Authorization: `Token ${token}`,
    // },
    ...options,
  });
  return instance;
};

export const movieInstance = axiosApi(TMDB_BASE_URL, paramsTMDB);
export const localInstance = axiosApi(LOCAL_BASE_URL);
export const localAuthInstance = axiosAuthApi(LOCAL_BASE_URL);

// const api_tmdb = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//     accept: "application/json,",
//   },
//   params: {
//     api_key: process.env.MOVIE_DB_API_KEY,
//     language: "ko-KR",
//   },
// });

// export const apis_tmdb = {
//   get: () => api_tmdb.get(),
// };

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5001/",
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//     accept: "application/json,",
//   },
// });

// export const apis = {
//   get: () => api.get("/posts"), //지금은 단순한 get요청
//   // 코드 추가시...
// };

// import axios from "axios";

// export const axios = async () => {
//   let response;

//   try {
//     response = await axios.get(url, config);
//   } catch (e) {
//     // catch error
//     throw new Error(e.message);
//   }

//   // if success return value
//   return response?.data ? response?.data : null; // or set initial value
// };
