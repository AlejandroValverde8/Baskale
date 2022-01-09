<template>
  <div class="carrito card p-3">
    <div class="carrito-title">
      <h4 class="mb-3 text-center">Cesta de la compra</h4>
    </div>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="producto in prodCarrito"
        :key="producto.id"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div class="col-10">
            <span class="badge bg-primary me-2">{{
              producto.cantidadCarrito
            }}</span
            >{{ producto.nombre }} - {{ producto.precio }} €
          </div>
          <div class="col-2 d-flex justify-content-end">
            <div
              class="btn btn-outline-danger"
              @click="quitarProducto(producto)"
            >
              <i class="bi bi-trash-fill"></i>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="carrito-footer">
      <h4 class="text-center my-3">Total: {{ total }} €</h4>
      <div
        :disabled="prodCarrito.length === 0"
        @click="$emit('comprar')"
        class="col-12 btn btn-success"
      >
        Tramitar pedido
      </div>
    </div>
  </div>
</template>

<style>
@media (max-width: 768px) {
  .carrito {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 300px;
    overflow-y: auto;
  }
  .carrito .carrito-title {
    position: sticky;
    top: 0;
    z-index: 1;
    background: white;
  }
  .carrito .carrito-footer {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background: white;
  }
}
@media (min-width: 768px) {
  .carrito {
    background: white;
    position: sticky;
    top: 100px;
    z-index: 2;
  }
}
</style>

<script>
export default {
  name: "Carrito",
  props: ["prodCarrito", "arrIdCan"],
  computed: {
    total() {
      const cuenta = this.prodCarrito.reduce(
        (acumulador, producto) =>
          acumulador + Number(producto.precio * producto.cantidadCarrito),
        0
      );
      this.$emit("devolverTotal", cuenta);
      return cuenta;
    },
  },
  methods: {
    quitarProducto(producto) {
      this.$emit("quitarProducto", producto);
    },
    comprar() {
      this.$emit("comprar");
    },
  },
};
</script>
