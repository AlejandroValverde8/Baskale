<template>
  <div class="container">
    <div class="row">
      <div :class="!this.admin ? 'col-md-8 col-12' : 'col-12'">
        <div class="card">
          <h5 class="card-header">Detalle del producto</h5>
          <div class="card-body">
            <div class="col-md-12">
              <img
                class="detalle-imagen"
                :src="this.producto.urlImagen"
                :alt="this.producto.nombre || 'Nombre del producto'"
              />
            </div>
            <h5 class="card-title my-3">{{ this.producto.nombre }}</h5>
            <p class="card-text">{{ this.producto.descripcion }}</p>
            <p class="card-text">
              <b>Precio:</b>
              {{
                this.producto.precio ? `${this.producto.precio} €` : "Consultar"
              }}
            </p>
            <div
              v-if="!this.admin"
              @click="addProdCarrito(producto)"
              class="btn btn-outline-success btn-sm"
            >
              <i class="bi bi-cart-plus"></i>
              <span class="ms-2">Añadir a la cesta</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!this.admin" class="col-12 col-md-4">
        <Carrito
          :prodCarrito="productosCarrito"
          v-on:quitarProducto="quitarProducto"
          @on:comprar="comprar()"
        ></Carrito>
      </div>
    </div>
  </div>
</template>
<script>
import { database } from "../../Firebase";
import { ref, onValue } from "firebase/database";
import Carrito from "../Carrito";

export default {
  components: {
    Carrito,
  },

  data() {
    return {
      productosCarrito: [],
      producto: {},
      admin: false,
    };
  },

  created() {
    this.obtenerProd();
    this.comprobarCarrito();
  },

  methods: {
    obtenerProd() {
      this.admin = JSON.parse(localStorage.getItem("admin")) || false;
      const idProd = this.$route.params.id;
      const refProd = ref(database, `productos/${idProd}`);
      onValue(refProd, (snapshot) => {
        this.producto = snapshot.val();
        this.producto.id = idProd;
      });
    },

    addProdCarrito(producto) {
      const item = this.productosCarrito.find(
        (item) => item.id === producto.id
      );
      if (item) {
        this.productosCarrito.find((prod, index) => {
          if (prod.id == item.id) {
            item.cantidadCarrito = item.cantidadCarrito + 1;
            this.productosCarrito.splice(index, 1, item);
          }
        });
      } else {
        producto.cantidadCarrito = 1;
        this.productosCarrito.push(producto);
      }
      localStorage.setItem("store", JSON.stringify(this.productosCarrito));
    },

    quitarProducto(producto) {
      this.productosCarrito = this.productosCarrito.filter(
        (item) => item.id != producto.id
      );
      localStorage.setItem("store", JSON.stringify(this.productosCarrito));
    },

    comprobarCarrito() {
      if (localStorage.getItem("store") != null) {
        const arrCarrito = localStorage.getItem("store");
        const arrCarr = JSON.parse(arrCarrito);
        for (let index in arrCarr) {
          arrCarr[index].cantidadCarrito = Number(
            arrCarr[index].cantidadCarrito
          );
          this.productosCarrito.push(arrCarr[index]);
        }
      }
    },
  },
};
</script>
<style>
.detalle-imagen {
  width: 100%;
}
</style>
