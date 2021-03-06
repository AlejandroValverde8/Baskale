import Vue from "vue";
import VueRouter from "vue-router";
import CuteModal from "vue-cute-modal";

import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Usuario from "../views/Usuario.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Productos from "../views/Productos/Listado.vue";
import Detalle from "../views/Productos/Detalle.vue";
import AdminProductos from "../views/AdminProds.vue";
import Addprod from "../views/Addprod.vue";
import axios from "axios";
import About from "../views/About.vue";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(CuteModal);

const routes = [
  { path: "/home", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/", redirect: "/home" },
  { path: "/usuario/:id", name: "usuario", component: Usuario },
  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/productos", name: "productos", component: Productos },
  { path: "/adminprods", name: "AdminProds", component: AdminProductos },
  { path: "/detalle/:id", name: "detalle", component: Detalle },
  { path: "/addprod", name: "addprod", component: Addprod },
  { path: "/addprod/:id", name: "addprodId", component: Addprod },
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
