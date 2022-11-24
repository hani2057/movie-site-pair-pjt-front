<template>
  <div class="component-wrapper">
    <!-- <SearchBar /> -->
  </div>
</template>

<script>
import axios from "axios";
// import SearchBar from "@/components/SearchBar";

export default {
  name: "MyListsView",
  methods: {
    getAllMyLists() {
      axios({
        method: "get",
        url: `${this.$store.state.baseUrlLocalServer}/list/recommend_movie_list/`,
      })
        .then((res) => {
          console.log("get all lists", res);
        })
        .catch((err) => console.error(err));
    },
    getSingleUserMyLists() {
      this.$store.dispatch("getSingleUserMyLists");

      // const username = this.$store.state.username;

      // axios({
      //   method: "get",
      //   url: `${this.$store.state.baseUrlLocalServer}/list/recommend_movie_list/${username}`,
      // })
      //   .then((res) => {
      //     console.log("get sigle user's lists", res);
      //   })
      //   .catch((err) => console.error(err));
    },
  },
  components: {
    // SearchBar,
  },
  created() {
    this.getAllMyLists();
    this.getSingleUserMyLists();
  },
};
</script>

<style></style>
