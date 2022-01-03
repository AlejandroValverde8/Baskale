<template>
    <div class="container">
        <h1>Información de usuario</h1>

        <router-link :to="{ name:'usuario', params:{id : item} }" v-for="(item, index) of arregloUsuarios" :key="index">
            <button>{{ item }}</button>
        </router-link>
        <Usuario />
    </div>
</template>

<script>
import Usuario from '@/components/Usuario.vue';
export default {
    components:{
        Usuario
    },
    data(){
        return{
            arregloUsuarios:['Bupdar', 'Nudar', 'Gelberte', 'Duvid']
        }
    }
    
}
</script>