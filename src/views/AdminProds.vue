<template>
    <div class="container">
        <div class="cover">
            <div class="col-md-12">
                <h3>Productos de mi tienda: </h3>
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

    import { getAuth } from 'firebase/auth'
    import { getDatabase, set, ref, onValue, push, equalTo, query } from 'firebase/database'
    import { initializeApp } from 'firebase/app'

    const db = getDatabase();


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
        
        methods:{
            async getAllProds(){
                const usuarioActual = localStorage.getItem('adminuid');
                const productosRef = await query(ref(db, 'productos/idTienda'), equalTo(usuarioActual))
                console.log(productosRef);
                // await onValue(productosRef, (snapshot) => {
                // const refProd = snapshot.val();
                // console.log("refProd" + refProd);
                // })
                for (const productId in productosRef) {
                    this.productos.push(productosRef[productId])
                    }
                this.productosFiltered = this.productos;
                // updateCategoriasRef(postElement, data);
                
            },

            filtrar(){
                this.productosFiltered = this.productos.filter(producto => (
                producto.nombre.toLowerCase().includes(this.buscar.toLowerCase())
            ));
    }
        }
    }
</script>