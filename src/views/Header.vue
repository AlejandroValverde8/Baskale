<template>
  <ul class="nav justify-content-center py-3 shadow">
    <li class="nav-item">
      <router-link to="/home" class="nav-link">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/productos" class="nav-link">Productos</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/about" class="nav-link">About</router-link>
    </li>
    <li class="nav-item" v-if="logged">
      <router-link to="/usuario" class="nav-link">Usuario</router-link>
    </li>

    <button type="button" class="btn btn-primary ms-5" v-if="!logged">
      <router-link to="/login" class="">Log In</router-link>
    </button>
    <button type="button" class="btn btn-info ms-3" v-if="!logged">
      <router-link to="/signup" class="">Sign Up</router-link>
    </button>
  </ul>
</template>

<style>
ul.nav {
  background: rgb(238, 238, 238);
  position: sticky;
  top: 0;
  z-index: 1;
}
.shadow {
  box-shadow: 0 4px 2px -2px gray;
}
.nav-item .nav-link {
  text-decoration: none;
  color: #000;
}
.nav-item .nav-link:hover {
  color: orange;
}
.nav-item .nav-link.router-link-active {
  color: orange;
  font-weight: 700;
}
.btn a,
.btn a:hover {
  text-decoration: none;
  color: #fff;
}
</style>

<script>
export default {
  name: "Menu",
  data() {
    return {
      admin: false,
      logged: false,
    };
  },
  watch: {
    $route(to, from) {
      console.log("entra");
      if (to !== from) {
        console.log("entra");
        const isAdmin = JSON.parse(localStorage.getItem("admin")) || false;
        const isLogged = JSON.parse(localStorage.getItem("logged")) || false;
        this.admin = isAdmin;
        this.logged = isLogged;
      }
    },
  },
};
</script>
