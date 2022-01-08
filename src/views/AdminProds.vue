<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3>Administrar mis productos</h3>
          <div class="btn btn-primary">
            <RouterLink to="/addprod">Nuevo producto</RouterLink>
          </div>
        </div>
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
                <div class="col-12 btn btn-outline-warning btn-sm">
                  <i class="bi bi-pencil"></i>
                  <span class="editar-producto-boton ms-2"
                    ><RouterLink :to="`addprod/${producto.id}`"
                      >Editar Producto</RouterLink
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onValue } from "firebase/database";
import { database } from "../Firebase";

export default {
  data() {
    return {
      productos: [],
      productosFiltered: [],
      productosIds: [],
      buscar: "",
    };
  },

  created() {
    this.getAllProds();
  },

  methods: {
    async getAllProds() {
      const usuarioActual = localStorage.getItem("adminuid");
      const dbRef = ref(database, "productos/");
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const idTienda = childSnapshot.val().idTienda;
          if (idTienda == usuarioActual) {
            this.productos.push(childSnapshot.val());
          }
        });
        const refProd = snapshot.val();
        for (const productId in refProd) {
          if (refProd[productId].idTienda == usuarioActual) {
            this.productosIds.push(productId);
          }
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
  },
};
</script>

<style>
.editar-producto-boton a,
.editar-producto-boton a:hover {
  color: black;
}
</style>
