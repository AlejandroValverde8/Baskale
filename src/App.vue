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
#app {
}
</style>
