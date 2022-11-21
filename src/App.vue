<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
:root {
  --main-bg-color: #19191c;
  --main-text-color: #dee1e4;
}
#app {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
.component-wrapper {
  padding-top: 50px;
}
</style>
