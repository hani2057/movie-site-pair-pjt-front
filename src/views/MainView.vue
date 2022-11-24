<template>
  <div class="component-wrapper">
    <div class="main-wrapper">
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

      <div class="mt-5">
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
            <b-tab title="액션">
              <b-card-text>
                <MovieGenre
                  title="Action Movies"
                  id="AM"
                  :fetchUrl="this.urlActionMovies"
                />
              </b-card-text>
            </b-tab>

            <b-tab title="로맨스">
              <b-card-text>
                <MovieGenre
                  title="Romance Movies"
                  id="RM"
                  :fetchUrl="this.urlRomanceMovies"
                />
              </b-card-text>
            </b-tab>
            <b-tab title="스릴러">
              <b-card-text>
                <MovieGenre
                  title="Thriller Movies"
                  id="TM"
                  :fetchUrl="this.urlThrillerMovies"
                />
              </b-card-text>
            </b-tab>
            <b-tab title="코미디">
              <b-card-text>
                <MovieGenre
                  title="Comedy Movies"
                  id="CM"
                  :fetchUrl="this.urlComedyMovies"
                />
              </b-card-text>
            </b-tab>
            <b-tab title="판타지">
              <b-card-text>
                <MovieGenre
                  title="Fantasy Movies"
                  id="FM"
                  :fetchUrl="this.urlFantasyMovies"
                />
              </b-card-text>
            </b-tab>
            <b-tab title="애니메이션">
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

      <div>
        <!-- <router-view></router-view>
      <router-link :to="{name: 'movieTitle', params={movieId: singleMovieData.id}}"></router-link> -->
        <MovieModal
          v-if="isModalOpened"
          :singleMovieData="{ ...singleMovieData }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MovieRow from "@/components/MovieRow";
import MovieGenre from "@/components/MovieGenre";
import MovieModal from "@/components/MovieModal";

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
      urlThrillerMovies: "/discover/movie?with_genres=53",
      urlFantasyMovies: "/discover/movie?with_genres=14",
      urlAnimations: "/discover/movie?with_genres=16",
    };
  },
  computed: {
    isModalOpened() {
      return this.$store.state.isModalOpened;
    },
    singleMovieData() {
      return this.$store.state.singleMovieData;
    },
  },
  watch: {
    isModalOpened(newState) {
      console.log(newState);
      // this.isModalOpened();
    },
  },
  components: {
    MovieRow,
    MovieGenre,
    MovieModal,
  },
};
</script>

<style>
.main-wrapper {
  min-height: calc(100vh - 100px);
}
#tab {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}
#__BVID__341 > div.card-header {
  background-color: var(--main-bg-color) !important;
  border: none !important;
}
a,
a:visited,
a:hover {
  color: var(--main-text-color) !important;
}
a[aria-selected="true"] {
  color: var(--main-bg-color) !important;
}
</style>
