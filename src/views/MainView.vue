<template>
  <div>
    <MovieRow
      title="Movies for you"
      id="MR"
      :fetchUrl="this.urlRecommendations"
      :isLargeRow="true"
    />
    <MovieRow
      title="Now Playing"
      id="NP"
      :fetchUrl="this.urlNowPlaying"
      :isLargeRow="false"
    />

    <div>
      <b-card id="tab" no-body>
        <b-tabs card>
          <b-tab title="인기" active>
            <b-card-text>
              <MovieGenre
                title="Top Rated"
                id="TR"
                :fetchUrl="this.urlTopRated"
              />
            </b-card-text>
          </b-tab>
          <b-tab title="액션" active>
            <b-card-text>
              <MovieGenre
                title="Action Movies"
                id="AM"
                :fetchUrl="this.urlActionMovies"
              />
            </b-card-text>
          </b-tab>
          <b-tab title="코미디" active>
            <b-card-text>
              <MovieGenre
                title="Comedy Movies"
                id="CM"
                :fetchUrl="this.urlComedyMovies"
              />
            </b-card-text>
          </b-tab>
          <b-tab title="판타지" active>
            <b-card-text>
              <MovieGenre
                title="Fantasy Movies"
                id="FM"
                :fetchUrl="this.urlRomanceMovies"
              />
            </b-card-text>
          </b-tab>
          <b-tab title="애니메이션" active>
            <b-card-text>
              <MovieGenre
                title="Animations"
                id="AN"
                :fetchUrl="this.urlAnimations"
              />
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import MovieRow from "@/components/MovieRow";
import MovieGenre from "@/components/MovieGenre";

export default {
  name: "MainView",
  data() {
    return {
      urlRecommendations: "/movies/",
      urlNowPlaying: "/movie/now_playing",
      urlTrending: "/trending/all/week",
      urlTopRated: "/movie/top_rated",
      urlActionMovies: "/discover/movie?with_genres=28",
      urlComedyMovies: "/discover/movie?with_genres=35",
      urlRomanceMovies: "/discover/movie?with_genres=10749",
      urlFantasyMovies: "/discover/movie?with_genres=14",
      urlAnimations: "/discover/movie?with_genres=16",
      // urlHorrorMovies: "/discover/movie?with_genres=27",
      // urlDocumentaries: "/discover/movie?with_genres=99",
    };
  },
  components: {
    MovieRow,
    MovieGenre,
  },
};
</script>

<style>
#tab {
  background-color: #19191c;
  color: #dee1e4;
}
a,
a:visited,
a:hover {
  color: #dee1e4 !important;
}
a:active {
  color: #19191c !important;
}
/* a:hover {
  color: white !important;
}
a:visited {
  color: white;
} */
</style>
