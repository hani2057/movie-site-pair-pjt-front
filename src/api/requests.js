import {
  movieInstance,
  localInstance,
  // localAuthInstance,
} from "@/api/axios.js";

export const movieApi = {
  // nowPlaying: () => movieInstance.get("movie/now_playing"),
  showTrailer: (id) => movieInstance.get(`movie/${id}/videos`),
};

export const localApi = {
  signUp: (payload) => {
    localInstance.post("accounts/signup/", {
      data: payload,
    });
  },
};
// urlRecommendations: "/movies/",
//       urlNowPlaying: "/movie/now_playing",
//       urlTrending: "/trending/all/week",
//       urlTopRated: "/movie/top_rated",
//       urlActionMovies: "/discover/movie?with_genres=28",
//       urlRomanceMovies: "/discover/movie?with_genres=10749",
//       urlThrillerMovies: "/discover/movie?with_genres=53",
//       urlComedyMovies: "/discover/movie?with_genres=35",
//       urlFantasyMovies: "/discover/movie?with_genres=14",
//       urlAnimations: "/discover/movie?with_genres=16",
