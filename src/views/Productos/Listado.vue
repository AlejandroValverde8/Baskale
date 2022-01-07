<template>
  <div class="container">
    <div class="cover">
      <div class="col-md-8" style="display: inline-block">
        <h3>Productos</h3>
        <div class="form-group">
          <input
            type="search"
            v-model="buscar"
            @keyup="filtrar"
            class="form-control"
            placeholder="Introduzca producto"
          />
        </div><br />
        <div class="row">
          <div v-for="producto in productosFiltered" :key="producto.id" class="col-md-3">
            <div class="showcase">
              <img :src="producto.urlImagen" />
            </div>
            <div class="col-md-12">
              <h4>
                <RouterLink :to="`detalle/${producto.id}`">{{producto.nombre}}</RouterLink>
              </h4>
              <p>{{producto.descripcion}}</p>
              <p><b>Precio:</b> {{producto.precio}} €</p>
              <button @click="addProdCarrito(producto)" class="btn btn-success btn-sm">Agregar al carro</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-4" style="display: inline-block">
        <Carrito :prodCarrito="productosCarrito" :arrIdCan="arrIdCantidad" v-on:quitarProducto="quitarProducto" v-on:comprar=comprar()></Carrito>
      </div>

    </div>
  </div>
</template>
<script>
  import { getDatabase, ref, onValue } from "firebase/database";
  import { initializeApp } from "firebase/app";
  import { database } from "../../Firebase";
  import Carrito from '../Carrito';

  export default {

    components: {
      Carrito        
    },

    data() {
      return {
        productos: [],
        productosFiltered: [],
        productosIds: [],
        productosCarrito: [],
        arrIdCantidad: [{
          id: '',
          cantidad: ''
        }],
        buscar: ''
      };
    },

    created() {
      this.getAllProds();
      this.comprobarCarrito();
    },

    methods: {
      async getAllProds() {
        const productosRef = await ref(database, "productos/");
        await onValue(productosRef, snapshot => {
          const refProd = snapshot.val();
          for (const productId in refProd) {
            this.productos.push(refProd[productId]);
            this.productosIds.push(productId);
          }

          this.productos.forEach((element, index) => {
            this.productos[index].id = this.productosIds[index];
          });

          this.productosFiltered = this.productos;
          console.log(this.productosFiltered);
          // updateCategoriasRef(postElement, data);
        });
      },

      filtrar() {
        this.productosFiltered = this.productos.filter(producto =>
          producto.nombre.toLowerCase().includes(this.buscar.toLowerCase())
        );
      },

      addProdCarrito(producto){
        const item = this.productosCarrito.find(item => item.id === producto.id);
        if(item){
          this.productosCarrito.find((prod, index) => {
            if(prod.id == item.id){
              item.cantidadCarrito = item.cantidadCarrito + 1;
              this.productosCarrito.splice(index, 1, item);
            }
          })
          console.log(this.productosCarrito);
        } else{
          producto.cantidadCarrito = 1;
          this.productosCarrito.push(producto);
        }
        localStorage.setItem('store', JSON.stringify(this.productosCarrito));
        
      },

      quitarProducto(producto){
        this.productosCarrito = this.productosCarrito.filter(item => item.id != producto.id);
        localStorage.setItem('store', JSON.stringify(this.productosCarrito));
      },

      comprobarCarrito(){
        if(localStorage.getItem('store') != null){
          const arrCarrito = localStorage.getItem('store');
          const arrCarr = JSON.parse(arrCarrito);
          console.log(arrCarr);
          for(let index in arrCarr){
            arrCarr[index].cantidadCarrito = Number(arrCarr[index].cantidadCarrito);
            this.productosCarrito.push(arrCarr[index]);
          }
        }
      }

    },

    

    computed: {}
  };
</script>
<style>
  .cover {
    padding: 20px;
    margin: 40px 2px;
    border: 1px solid #d2e0e6;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .showcase {
    height: 100px;
    width: 150px;
  }
</style>
