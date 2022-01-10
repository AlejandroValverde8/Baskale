<template>
  <div class="container">
    <toast v-if="showToast" :texto="toast.texto" :estado="toast.estado" />
    <div class="row">
      <div :class="!this.admin ? 'col-md-8 col-12' : 'col-12'">
        <h3 class="mb-4">Productos</h3>
        <div class="form-group mb-4">
          <input
            type="search"
            v-model="buscar"
            @keyup="filtrar"
            class="form-control"
            placeholder="Buscar producto por nombre"
          />
        </div>
        <hr />
        <div class="row mt-4">
          <div
            v-for="producto in productosFiltered"
            :key="producto.id"
            class="col-12 col-md-6 col-lg-4 mb-3"
          >
            <div class="card mx-md-1">
              <img
                :src="producto.urlImagen"
                class="card-img-top"
                :alt="producto.nombre || 'Nombre de producto'"
              />
              <div class="card-body">
                <h5 class="card-title">
                  <RouterLink :to="`detalle/${producto.id}`">{{
                    producto.nombre
                  }}</RouterLink>
                </h5>
                <p class="card-text">
                  {{ producto.descripcion }}
                </p>
                <p class="card-text">
                  <b>Precio:</b>
                  {{ producto.precio ? `${producto.precio} €` : "Consultar" }}
                </p>
                <div
                  v-if="!admin"
                  @click="addProdCarrito(producto)"
                  class="col-12 btn btn-outline-success btn-sm"
                >
                  <i class="bi bi-cart-plus"></i>
                  <span class="ms-2">Añadir a la cesta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!this.admin" class="col-12 col-md-4">
        <Carrito
          :prodCarrito="productosCarrito"
          :arrIdCan="arrIdCantidad"
          v-on:quitarProducto="quitarProducto"
          v-on:devolverTotal="recogerTotal"
          v-on:comprar="comprar"
        ></Carrito>
      </div>
    </div>
    <MyModal
      :titulo="`Su compra`"
      :texto="productosCarrito"
      :accion="`Realizar Compra`"
      :total="total"
      v-on:recogerAccion="recogerAccion"
    />
  </div>
</template>
<script>
import { ref, onValue, push } from "firebase/database";
import { database } from "../../Firebase";
import Carrito from "../Carrito";
import MyModal from "../../components/Modal.vue";
import Toast from "../../components/Toast.vue";

export default {
  components: {
    Carrito,
    MyModal,
    Toast,
  },

  data() {
    return {
      productos: [],
      productosFiltered: [],
      productosIds: [],
      productosCarrito: [],
      arrIdCantidad: [
        {
          id: "",
          cantidad: "",
        },
      ],
      buscar: "",
      admin: false,
      total: "",
      toast: {
        texto: "",
        estado: "",
      },
      showToast: false,
    };
  },

  created() {
    this.getAllProds();
    this.comprobarCarrito();
    console.log(this.Carrito);
  },

  methods: {
    async getAllProds() {
      this.admin = JSON.parse(localStorage.getItem("admin")) || false;
      const productosRef = await ref(database, "productos/");
      await onValue(productosRef, (snapshot) => {
        const refProd = snapshot.val();
        for (const productId in refProd) {
          this.productos.push(refProd[productId]);
          this.productosIds.push(productId);
        }

        this.productos.forEach((element, index) => {
          this.productos[index].id = this.productosIds[index];
        });

        this.productosFiltered = this.productos;
      });
    },

    filtrar() {
      this.productosFiltered = this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(this.buscar.toLowerCase())
      );
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

    comprar() {
      if (!localStorage.getItem("uid")) this.$router.push("/login");
      else this.$cuteModal.open("mod");
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
    recogerTotal(cuenta) {
      this.total = cuenta;
    },
    async guardarCompra() {
      const arrayProdCompra = [];
      this.productosCarrito.forEach((element, index) => {
        arrayProdCompra[index] = element.nombre;
      });
      try {
        await push(ref(database, "compras/"), {
          idTienda: this.productosCarrito[0].idTienda,
          idUsuario: localStorage.getItem("uid"),
          detalle: arrayProdCompra,
          cantidadTotal: this.total,
        });
        this.toast = {
          texto: "Su compra se ha efectuado con éxito",
          estado: "success",
        };
        this.productosCarrito = [];
        localStorage.setItem("store", JSON.stringify(this.productosCarrito));
        this.$cuteModal.hide("mod");
        this.showToast = true;
      } catch (err) {
        console.log(err);
        this.toast = {
          texto: "Error al efectuar su compra",
          estado: "danger",
        };
        this.$cuteModal.hide("mod");
        this.showToast = true;
      }
    },

    recogerAccion() {
      this.showToast = false;
      this.guardarCompra();
    },
  },
};
</script>
<style>
.card-title a {
  text-decoration: none;
}
</style>
