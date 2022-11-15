import axios from "@/api/axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.MOVIE_DB_API_KEY,
    language: "ko-KR",
  },
});

export default instance;
