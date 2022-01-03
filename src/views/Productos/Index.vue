<template>
    <div class="container">
        <div class="cover">
            <div class="col-md-12">
                <h3>Productos</h3>
            </div>
            <div class="row">
                <div v-for="(producto, index) in productos" :key="index" class="col-md-3">
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

    import { getDatabase, set, ref, onValue, push} from "firebase/database";
    import { initializeApp } from "firebase/app";

    const firebaseConfig = {
        apiKey: "AIzaSyBMXVbyqGZmFZnVjSub3oHAqrPH_Pmw5gA",
        authDomain: "baskale-7d540.firebaseapp.com",
        projectId: "baskale-7d540",
        storageBucket: "baskale-7d540.appspot.com",
        messagingSenderId: "57311874743",
        appId: "1:57311874743:web:71e6f69c64ee58f7b58732",
        databaseURL: "https://baskale-7d540-default-rtdb.europe-west1.firebasedatabase.app/"
    };

    //Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const dbRef = getDatabase(app);

    export default {
        data(){
            return{
                productos: []
            }
        },

        created(){
            this.getAllProds();
            
        },

        methods:{
            async getAllProds(){
                const productosRef = await ref(dbRef, 'productos/');
                await onValue(productosRef, (snapshot) => {
                    this.productos = snapshot.val();
                    console.log(this.productos);
                    console.log(this.productos[0]);
                    console.log(Object.keys(this.productos));
                    //updateCategoriasRef(postElement, data);
                });
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

    img {
        max-width: 100%;
        max-height: 100%;
    }


    .showcase {
        height: 100px;
        width: 150px;
    }


</style>