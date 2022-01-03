<template>
  <div id="app">
    <Menu />
    <div class="container my-4">
      <router-view />
    </div>
  </div>
</template>
<script>
import Menu from "./views/Header";
export default {
  components: {
    Menu,
  },
};
</script>
<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
