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
                <div v-for="producto in productosFiltered" :key="producto.id" class="col-md-3">
                    <div class="showcase">
                        <img :src="producto.urlImagen">
                    </div>
                    <div class="col-md-12">
                        <h4><RouterLink :to="`detalle/${producto.id}`">{{producto.nombre}}</RouterLink></h4>
                        <p>{{producto.descripcion}}</p>
                        <div class="btn btn-success btn-sm">
                           <RouterLink :to="`addprod/${producto.id}`">Editar Producto</RouterLink>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { getAuth } from 'firebase/auth'
    import { ref, onValue } from 'firebase/database'
    

    import { database } from '../Firebase';


    export default {
        data () {
            return {
                productos: [],
                productosFiltered: [],
                productosIds: [],
                buscar: ''
            }
        },

        created () {
            this.getAllProds()
        },
        
        methods:{
            async getAllProds(){
                const usuarioActual = localStorage.getItem('adminuid');
                const dbRef = ref(database, 'productos/');
                onValue(dbRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const idTienda = childSnapshot.val().idTienda;
                        if(idTienda == usuarioActual){
                            this.productos.push(childSnapshot.val());
                        }
                    });
                    const refProd = snapshot.val();
                    for ( const productId in refProd) {
                        if(refProd[productId].idTienda == usuarioActual){
                            this.productosIds.push(productId);
                        }
                        
                    }
                    this.productos.forEach((element, index) => {
                       this.productos[index].id = this.productosIds[index];
                        console.log(this.productos[index], this.productosIds[index]);
                    });
                    this.productosFiltered = this.productos; 
                });
            },
            filtrar(){
                this.productosFiltered = this.productos.filter(producto => (
                    producto.nombre.toLowerCase().includes(this.buscar.toLowerCase())
                ));
    }
        }
    }
</script>