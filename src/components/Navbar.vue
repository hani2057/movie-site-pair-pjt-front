<template>
  <div>
    <nav>
      <router-link :to="{ name: 'main' }">TiCi</router-link> |
      <router-link :to="{ name: 'list' }">Movies</router-link> |
      <router-link to="/login">Log In</router-link> |
      <!-- <router-link to="/main">Log Out</router-link> | -->
      <router-link to="/signup">Sign Up</router-link> |
      <router-link :to="{ name: 'profile', params: { username: username } }">
        Profile
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      username: "hani",
    };
  },
};
</script>

<style></style>
