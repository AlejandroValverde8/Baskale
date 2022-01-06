<template>
    <div class="container">
        <div class="cover">
            <div class="col-md-12">
                <h3>Detalle de Producto</h3>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="col-md-12 img-section">
                        <img :src="this.producto.urlImagen">
                    </div>
                    <div class="col-md-12">
                        <h4>{{this.producto.nombre}}</h4>
                        <p>{{this.producto.descripcion}}</p>
                        <p><b>Precio: </b>{{this.producto.precio}} €</p>
                        <button @click="addProdCarrito(producto)" class="btn btn-success btn-sm">Agregar al carro</button>
                    </div>
                </div>
                <div class="col-md-4" style="display: inline-block">
                  <Carrito :prodCarrito="productosCarrito" @on:quitarProducto=quitarProducto() @on:comprar=comprar()></Carrito>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { database } from "../../Firebase";
  import { ref, onValue } from "firebase/database";
  import Carrito from '../Carrito';

export default {

  components: {
      Carrito        
    },

  data () {
    return {
      producto: {
      },

      productosCarrito: []
    }
  },

  created () {
    this.obtenerProd();
    this.comprobarCarrito();
  },

  methods: {
    obtenerProd () {
      const idProd = this.$route.params.id;
      const refProd = ref(database, `productos/${idProd}`);
      onValue(refProd, (snapshot) => {
        this.producto = snapshot.val();
        console.log(snapshot.val());
      });
    },

     addProdCarrito(producto){
        this.productosCarrito.push(producto);
        localStorage.setItem('store', JSON.stringify(this.productosCarrito));
      },

      quitarProducto(){

      },

      comprobarCarrito(){
        if(localStorage.getItem('store') != null){
          const arrCarrito = localStorage.getItem('store');
          const arrCarr = JSON.parse(arrCarrito);
          console.log(arrCarr);
          for(let index in arrCarr){
            this.productosCarrito.push(arrCarr[index]);
          }
        }
      }
  }
}
</script>
<style>

    .cover{
        padding: 20px;
        margin: 40px 2px;
        border: 1px solid #D2E0E6
    }

    .img-section img{
        width: 100%;
    }

</style>
