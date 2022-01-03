<template>
    <div class="container">
        <div class="cover">
            <div class="col-md-12">
                <h3>Productos</h3>
            </div>
            <div class="form-group">
              <input type="search" v-model="buscar" @keyup="filtrar" class="form-control" placeholder="Introduzca producto"/>
            </div><br />
            <div class="row">
                <div v-for="(producto, index) in productosFiltered" :key="index" class="col-md-3">
                    <div class="showcase">
                        <img :src="producto.urlImagen">
                    </div>
                    <div class="col-md-12">
                        <h4><RouterLink :to="`detalle/${index}`">{{producto.nombre}}</RouterLink></h4>
                        <p>{{producto.descripcion}}</p>
                        <p>{{producto.precio}} €</p>
                        <a href="#" class="btn btn-success btn-sm">Agregar al carro</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { getDatabase, set, ref, onValue, push } from 'firebase/database'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBMXVbyqGZmFZnVjSub3oHAqrPH_Pmw5gA',
  authDomain: 'baskale-7d540.firebaseapp.com',
  projectId: 'baskale-7d540',
  storageBucket: 'baskale-7d540.appspot.com',
  messagingSenderId: '57311874743',
  appId: '1:57311874743:web:71e6f69c64ee58f7b58732',
  databaseURL: 'https://baskale-7d540-default-rtdb.europe-west1.firebasedatabase.app/'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const dbRef = getDatabase(app)

export default {
  data () {
    return {
      productos: [],
      productosFiltered: [],
      buscar: ''
    }
  },

  created () {
    this.getAllProds()
  },

  methods: {
    async getAllProds () {
      const productosRef = await ref(dbRef, 'productos/')
      await onValue(productosRef, (snapshot) => {
        const refProd = snapshot.val();
        for ( const productId in refProd) {
          this.productos.push(refProd[productId])
        }
        this.productosFiltered = this.productos;
        // updateCategoriasRef(postElement, data);
      })
    },

    filtrar(){
         this.productosFiltered = this.productos.filter(producto => (
          producto.nombre.toLowerCase().includes(this.buscar.toLowerCase())
         ));
    }

  },

computed:{
  
}

}
</script>
<style>

    .cover{
        padding: 20px;
        margin: 40px 2px;
        border: 1px solid #D2E0E6
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
