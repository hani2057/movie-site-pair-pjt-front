<template>
  <div class="component-wrapper">
    <!-- <div>
      <h1>Profile</h1>
      <p>아이디 : {{ user?.email }}</p>
      <p>{{ username }}</p>
      <p>{{ user }}</p>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "UserView",
  // data() {
  //   return {
  //     user: null,
  //   };
  // },
  // props: {
  //   username: String,
  // },
  // created() {
  //   this.getUserProfile();
  // },
  // methods: {
  //   getUserProfile() {
  //     axios({
  //       methods: "get",
  //       url: `${this.$store.state.baseUrlLocalServer}/profile/${this.$route.params.username}`,
  //     })
  //       .then((res) => {
  //         // console.log(res);
  //         this.user = res.data;
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   },
  // },
};
</script>
