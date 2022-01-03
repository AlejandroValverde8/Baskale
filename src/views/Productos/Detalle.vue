<template>
    <div class="container">
        <div class="cover">
            <div class="col-md-12">
                <h3 class="text-center">Detalle de Producto</h3>
            </div>
            <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-8">
                    <div class="col-md-12 img-section">
                        <img src="https://placekitten.com/200/100">
                    </div>
                    <div class="col-md-12">
                        <h4>{{this.producto.nombre}}</h4>
                        <p>{{this.producto.descripcion}}</p>
                        <a href="#" class="btn btn-success btn-sm">Agregar al carro</a> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                producto:{
                    nombre:'',
                    descripcion:'',
                    precio:'',
                    stock:''
                }
            }
        },

        methods:{
            obtenerProd(){
                let idProd = this.$route.params.id;
                //Conseguir que se vea el producto a raíz de este id
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