<template>
    <div class="container">
            <form @submit.prevent="pressed">
                <div class="form-group">
                    <label for="nombre">Nombre del Producto</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Escriba el nombre del producto" v-model="producto.nombre"><br/>
                </div>
            
            <div class="form-group">
                    <label for="descripcion">Descripción del Producto</label>
                    <textarea class="form-control" id="desccripcion" rows="3" placeholder="Escriba una descripción del producto" v-model="producto.descripcion"></textarea><br/>
                </div>

                <div class="form-row align-items-center">
                    <div class="col-auto my-1">
                        <label class="mr-sm-2" for="selectCategoria">Categoría del producto</label>
                        <select class="custom-select mr-sm-2" id="selectCategoria" v-model="producto.categoria">
                            <option selected>Elija una categoría</option>
                            <option v-for="categoria in categorias" :key="categoria.id">{{ categoria.nombre }}</option>
                        </select><br/>
                    </div>
                </div><br/>

                <div class="form-group">
                    <label for="precio">Precio del producto</label>
                    <input type="number" class="form-control" id="precio" placeholder="Introduzca el precio del producto" v-model="producto.precio"><br/>
                </div><br/>

                 <div class="form-group">
                    <label for="stock">Unidades</label>
                    <input type="number" class="form-control" id="stock" placeholder="Indique las unidades disponibles" v-model="producto.stock"><br/>
                </div><br/>

                <div class="form-group">
                    <label for="imagen">Imagen del Producto</label>
                    <input type="file" @change="obtenerImagen" class="form-control-file" id="imagen" placeholder=""><br/>
                    <figure>
                        <img width="30%" height="15%" :src="imagenPrev" alt="Foto del producto">
                    </figure>
                </div><br/>

                <button type="submit" class="btn btn-primary">Guardar</button>
                <button type="reset" class="btn btn-primary" style="margin-left: 20%">Cancelar</button>
            </form>
    </div>
</template>

<script>

    import { getDatabase, set, ref, onValue, push} from "firebase/database";
    import {database, app} from "../Firebase";
    import * as storage from "firebase/storage";


    const store = storage.getStorage(app);

    export default {

        data(){
            return {
                categoria: {
                    id: '', 
                    nombre: ''
                },

                categorias: [],

                urlDescarga:'',
                
                producto:{
                    nombre:'',
                    descripcion:'',
                    categoria:'',
                    precio:'',
                    stock:'',
                },
                
                imagenMiniatura:'',

                imagen:''
                
            }
        },

        created(){
            //metodo para traerse el valor de admin del local storage, si es falso router.push a home
            this.readCategorias();
        },

        methods:{
            async readCategorias(){
                const categoriasRef = await ref(database, 'categorias/');
                await onValue(categoriasRef, (snapshot) => {
                    this.categorias = snapshot.val();
                    //console.log(this.categorias);
                    //updateCategoriasRef(postElement, data);
                });
            },

            async addProd(){
                const imageRef = storage.ref(store, `images/imagesProd/${this.imagen.name}`);
                await storage.uploadBytes(imageRef, this.imagen);
                //console.log("Guardado "+ this.imagen.name);
                const urlDescarga = await storage.getDownloadURL(imageRef);
                this.urlDescarga = urlDescarga;
                //console.log("URL "+ this.urlDescarga);

                await push(ref(database, 'productos/'),{
                    nombre: this.producto.nombre,
                    descripcion: this.producto.descripcion,
                    categoria: this.producto.categoria,
                    precio: this.producto.precio,
                    stock: this.producto.stock,
                    urlImagen: this.urlDescarga
                });
                //console.log("Guardado " + this.producto.name + this.producto.descripcion + this.producto.categoria + this.producto.precio, this.producto.stock, this.urlDescarga);
            },
            
            obtenerImagen(e){
                let file = e.target.files[0];
                this.imagen = file;
                this.cargarImagen(file);
            },

            cargarImagen(file){
                let reader = new FileReader();
                reader.onload = (e) =>{
                    this.imagenMiniatura = e.target.result;
                }
                reader.readAsDataURL(file);
            },
            pressed(){
                this.addProd();
            }
            
        },

        computed:{
            imagenPrev(){
                return this.imagenMiniatura;
            }
        }
    }
</script>

<style scoped>

</style>