import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contacto from '../views/Contacto.vue'
import Usuario from '../views/Usuario.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Productos from '../views/Productos/Listado.vue'
import Detalle from '../views/Productos/Detalle.vue'
import Addprod from '../views/Addprod.vue'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') },
  { path: '/contacto', name: 'contacto', component: Contacto },
  { path: '/usuario/:id', name: 'usuario', component: Usuario },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/productos', name: 'productos', component: Productos },
  { path: '/detalle/:id', name: 'detalle', component: Detalle },
  { path: '/addprod', name: 'addprod', component: Addprod }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
