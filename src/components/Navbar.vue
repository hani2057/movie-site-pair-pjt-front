<template>
  <div>
    <nav>
      <router-link :to="{ name: 'main' }">TiCi</router-link> |
      <router-link to="/list">Movies</router-link> |
      <router-link to="/login">Log In</router-link> |
      <!-- <router-link to="/main">Log Out</router-link> | -->
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/profile" :params="{ username: this.username }"
        >Profile</router-link
      >
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    username: String,
  },
};
</script>

<style></style>
