<template>
  <div class="modal" tabindex="-1" ref="mod" id="mod">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ titulo }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ texto }}</p>
        </div>
        {{ acciones }}
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";

export default {
  name: "MyModal",
  props: ["titulo", "texto", "acciones"],
  data() {
    return {
      modal: null,
    };
  },

  methods: {
    mostrar() {
      this.modal.show();
    },
  },

  mounted() {
    this.modal = new Modal(this.$refs.mod);
    console.log(this.modal);
  },
};
</script>
