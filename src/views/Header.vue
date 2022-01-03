
<template>
  <ul class="nav justify-content-center">
    <li class="nav-item">
      <router-link to="/" class="nav-link active">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/Productos" class="nav-link">Productos</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/contacto" class="nav-link">Contacto</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/about" class="nav-link">About</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/usuario" class="nav-link">Usuario</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/login" class="nav-link">Log In</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/signup" class="nav-link">Sign Up</router-link>
    </li>
  </ul>
</template>

<script>
    export default {
        name: 'Menu'
    };
</script>
