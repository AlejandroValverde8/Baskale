<template>
  <cute-modal name="mod" class="custom-modal" id="mod">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ titulo }}</h5>
          <button
            type="button"
            class="btn-close"
            @click="cerrarModal()"
          ></button>
        </div>
        <div class="modal-body">
          <div id="compra" v-if="accion == `Realizar Compra`">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="producto in texto"
                :key="producto.id"
              >
                {{ producto.cantidadCarrito }}x {{ producto.nombre }} -
                {{ producto.precio * producto.cantidadCarrito }} €
              </li>
              <li class="list-group-item"><b>TOTAL: </b>{{ total }} €</li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="cerrarModal()"
          >
            Cerrar</button
          ><button
            type="button"
            class="btn btn-primary ms-3"
            @click="recogerAccion()"
          >
            {{ accion }}
          </button>
        </div>
      </div>
    </div>
  </cute-modal>
</template>
<script>
export default {
  name: "MyModal",
  props: ["titulo", "texto", "accion", "total"],
  methods: {
    cerrarModal() {
      this.$cuteModal.hide("mod");
    },

    recogerAccion() {
      this.$emit("recogerAccion");
    },
  },
};
</script>
<style>
.custom-modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 1055;
  width: 100%;
  height: 100%;
}
.cute-modal {
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-20%, -20%);
}
</style>
