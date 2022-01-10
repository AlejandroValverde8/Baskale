<template>
  <div
    ref="el"
    :class="`toast bg-${estado} text-light`"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex justify-content-between align-items-center">
      <div class="toast-body">
        {{ texto }}
      </div>
      <button
        type="button"
        class="btn-close text-light"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>
<script>
import { Toast } from "bootstrap";

export default {
  name: "Toast",
  props: ["texto", "estado"],
  data() {
    return {
      toast: null,
    };
  },
  mounted() {
    this.toast = new Toast(this.$refs.el);
    this.toast.show();
  },
};
</script>
<style>
.toast {
  position: absolute;
  top: 100px;
  left: 30px;
}
</style>
