<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'main' }">TiCi</router-link> |
      <router-link to="/list">Movies</router-link> |
      <router-link to="/login">Log In</router-link> |
      <!-- <router-link to="/main">Log Out</router-link> | -->
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/profile">Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #19191c;
  color: #dee1e4;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
