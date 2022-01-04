<template>
  <div class="page-not-found my-5">
    <h1 class="mb-5">Página no encontrada</h1>
    <img class="image" :src="this.imageNotFound" />
    <RouterLink :to="'/home'">Volver al inicio</RouterLink>
  </div>
</template>

<style>
.page-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-not-found .image {
  max-width: 700px;
  margin-bottom: 20px;
}
</style>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      imageNotFound: "https://fbm.es/imagenes/error-404.png",
    };
  },
};
</script>
