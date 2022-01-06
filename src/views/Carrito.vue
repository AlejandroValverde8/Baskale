<template>

    <div class="card p-3 my-5">
        <h4>Carrito de la compra</h4>
        <ul class="list-group">
            <li class="list-group-item" v-for="producto in prodCarrito" :key="producto.id">
                <div class="col-md-9" style="display: inline-block">
                    {{ producto.cantidadCarrito }}x {{ producto.nombre }} - {{ producto.precio }} €
                </div>
                <div class="col-md-1" style="display: inline-block">
                    <button type="button" class="btn btn-danger" style="margin-left: 5%" @click="quitarProducto(producto)">Eliminar</button>
                </div>             
            </li>
        </ul>     
            <h4 class="text-center">Total: {{ total }} €</h4>
        <button :disabled="prodCarrito.length === 0" @click="$emit('comprar')" class="btn btn-info form-control">COMPRAR</button>
    </div>

</template>

<script>
    export default {
        name:'Carrito',
        props: ['prodCarrito'],
        computed:{
            total() {
                return this.prodCarrito.reduce((acumulador, producto) => acumulador + Number(producto.precio),0);
            }
        },
        methods:{
            quitarProducto(producto){
                this.$emit('quitarProducto', producto);
            }
        }    
    }
</script>