<template>
  <div>
    <MovieRow
      title="NETFLIX ORIGINALS"
      id="NO"
      :fetchUrl="this.fetchNetflixOriginals"
      :isLargeRow="true"
    />
    <MovieRow
      title="Trending Now"
      id="TN"
      :fetchUrl="this.fetchTrending"
      :isLargeRow="false"
    />
    <MovieRow
      title="Top Rated"
      id="TR"
      :fetchUrl="this.fetchTopRated"
      :isLargeRow="false"
    />
    <MovieRow
      title="Action Movies"
      id="AM"
      :fetchUrl="this.fetchActionMovies"
      :isLargeRow="false"
    />
    <MovieRow
      title="Comedy Movies"
      id="Cm"
      :fetchUrl="this.fetchComedyMovies"
      :isLargeRow="false"
    />
  </div>
</template>

<script>
import MovieRow from "@/components/MovieRow";

export default {
  name: "MainView",
  data() {
    return {
      fetchNowPlaying: "movie/now_playing",
      fetchNetflixOriginals: "/discover/tv?with_networks=213",
      fetchTrending: "/trending/all/week",
      fetchTopRated: "/movie/top_rated",
      fetchActionMovies: "/discover/movie?with_genres=28",
      fetchComedyMovies: "/discover/movie?with_genres=35",
      fetchHorrorMovies: "/discover/movie?with_genres=27",
      fetchRomanceMovies: "/discover/movie?with_genres=10749",
      fetchDocumentaries: "/discover/movie?with_genres=99",
    };
  },
  components: {
    MovieRow,
  },
};
</script>

<style></style>
