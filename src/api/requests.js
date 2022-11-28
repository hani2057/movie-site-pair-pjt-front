import movieInstance from "@/api/axios";

export const movieApi = {
  nowPlaying: () => movieInstance.get("movie/now_playing"),
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
