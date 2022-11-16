<template>
  <div>
    <MovieRow
      title="Movies for you"
      id="NO"
      :fetchUrl="this.fetchNetflixOriginals"
      :isLargeRow="true"
    />
    <MovieRow
      title="Now Playing"
      id="TN"
      :fetchUrl="this.fetchNowPlaying"
      :isLargeRow="false"
    />
    <!-- <MovieRow
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
    /> -->

    <!-- <div>
      <ul>
        <li
          v-for="(tab, idx) in this.tabs"
          :key="idx"
          :class="{ active: currentTab === idx }"
        >
          <a href="#" @click="handleTabClick(idx)">{{ tab }}</a>
        </li>
      </ul>
      <div>
        <MovieGenre />
        <div v-if="currentTab === 0">tab content1</div>
        <div v-if="currentTab === 1">tab content2</div>
        <div v-if="currentTab === 2">tab content3</div>
      </div>
    </div> -->

    <div>
      <b-card id="tab" no-body>
        <b-tabs card>
          <b-tab title="Tab1" active>
            <b-card-text>
              <MovieGenre />
            </b-card-text>
          </b-tab>
          <b-tab title="Tab2" active>
            <b-card-text> tab content2</b-card-text>
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
      currentTab: 0,
      tabs: ["tab1", "tab2", "tab3"],
      fetchNowPlaying: "/movie/now_playing",
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
  methods: {
    handleTabClick(idx) {
      console.log(this.currentTab);
      console.log(idx);
      this.currentTab = idx;
    },
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
a {
  color: white;
}
a:hover {
  color: white !important;
}
a:visited {
  color: white;
}
</style>
