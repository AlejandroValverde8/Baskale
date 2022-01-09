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
          <p>{{ texto }}</p>
        </div>
        <div class="modal-footer" v-html="acciones"></div>
      </div>
    </div>
  </cute-modal>
</template>
<script>
export default {
  name: "MyModal",
  props: ["titulo", "texto", "acciones"],
  methods: {
    cerrarModal() {
      this.$cuteModal.hide("mod");
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
