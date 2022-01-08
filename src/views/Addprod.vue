<template>
  <div class="container">
    <h3 class="mb-4">
      {{ this.productoId ? "Editar producto" : "Añadir producto" }}
    </h3>
    <form @submit.prevent="getFormValues" class="form-addprod row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="nombre">
            Nombre
            <span class="required" />
          </label>
          <input
            type="text"
            class="form-control"
            id="nombre"
            placeholder="Introduzca el nombre del producto"
            v-model="producto.nombre"
          />
          <div
            v-if="this.formErrors.nombre"
            class="alert alert-danger py-1 mt-2"
            role="alert"
          >
            Campo requerido
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="precio">
            Precio
            <span class="required" />
          </label>
          <input
            type="number"
            class="form-control"
            id="precio"
            placeholder="Introduzca el precio del producto"
            v-model="producto.precio"
          />
          <div
            v-if="this.formErrors.precio"
            class="alert alert-danger py-1 mt-2"
            role="alert"
          >
            Campo requerido
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <label for="selectCategoria">
          Categoría
          <span class="required" />
        </label>
        <select
          class="form-select"
          id="selectCategoria"
          v-model="producto.categoria"
        >
          <option value>Seleccione una categoría</option>
          <option
            v-for="categoria in categorias"
            :value="categoria.nombre"
            :key="categoria.id"
            >{{ categoria.nombre }}</option
          >
        </select>
      </div>

      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="stock">
            Unidades
            <span class="required" />
          </label>
          <input
            type="number"
            class="form-control"
            id="stock"
            placeholder="Indique las unidades disponibles"
            v-model="producto.stock"
          />
        </div>
      </div>

      <div class="col-12">
        <div class="form-group">
          <label for="descripcion">
            Descripción
            <span class="required" />
          </label>
          <textarea
            class="form-control"
            id="descripcion"
            rows="3"
            placeholder="Introduzca una descripción del producto"
            v-model="producto.descripcion"
          ></textarea>
        </div>
      </div>

      <div class="col-12 my-4">
        <div class="form-group row">
          <div class="col-12 col-md-4 d-flex flex-column pe-5">
            <label for="imagen">
              Imagen
              <span class="required" />
            </label>
            <div
              v-if="this.imagenMiniatura"
              class="btn btn-danger mb-4"
              @click="borrarImagen()"
            >
              <i class="bi bi-trash me-3"></i>Eliminar imagen
            </div>
            <div class="uploadFile">
              <div
                v-if="!this.imagenMiniatura"
                class="col-12 btn btn-primary mb-4"
              >
                <i class="bi bi-upload me-3"></i>Subir imagen
              </div>
              <input
                type="file"
                v-if="!this.imagenMiniatura"
                @change="obtenerImagen"
                class="form-control-file"
                id="imagen"
              />
            </div>
          </div>
          <div class="col-12 col-md-8 d-flex justify-content-center">
            <img
              width="50%"
              height="100%"
              v-if="this.imagenMiniatura"
              :src="this.imagenMiniatura"
              alt="Foto del producto"
            />
          </div>
        </div>
      </div>

      <hr />
      <div class="col-12 col-md-4 mt-4">
        <button type="submit" class="col-12 btn btn-success">
          {{ this.productoId ? "Guardar" : "Crear" }}
        </button>
      </div>
      <div class="col-12 col-md-4 mt-4">
        <button type="reset" class="col-12 btn btn-secondary">Cancelar</button>
      </div>
      <div class="col-12 col-md-4 mt-4" v-if="this.productoId">
        <div
          v-if="this.$route.params.id"
          @click="borrarProdById()"
          class="col-12 btn btn-outline-danger"
        >
          Eliminar
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onValue, push } from "firebase/database";
import { database, app } from "../Firebase";
import * as storage from "firebase/storage";

const store = storage.getStorage(app);

export default {
  data() {
    return {
      categoria: {
        id: "",
        nombre: "",
      },

      categorias: [],

      urlDescarga: "",

      producto: {
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        stock: "",
        urlImagen: "",
        idAdmin: "",
      },

      formErrors: [{ nombre: false }, { precio: false }],
      imagenMiniatura: "",

      imagen: "",

      productoId: "",
    };
  },

  created() {
    this.comprobarModo();
    this.getItemAdmin();
    this.readCategorias();
  },

  methods: {
    async readCategorias() {
      const categoriasRef = await ref(database, "categorias/");
      await onValue(categoriasRef, (snapshot) => {
        this.categorias = snapshot.val();
      });
    },

    async addProd() {
      const imageRef = storage.ref(
        store,
        `images/imagesProd/${this.imagen.name}`
      );
      await storage.uploadBytes(imageRef, this.imagen);
      const urlDescarga = await storage.getDownloadURL(imageRef);
      this.urlDescarga = urlDescarga;

      await push(ref(database, "productos/"), {
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        categoria: this.producto.categoria,
        precio: this.producto.precio,
        stock: this.producto.stock,
        urlImagen: this.urlDescarga,
        idTienda: localStorage.getItem("adminuid"),
      });
    },

    obtenerImagen(e) {
      const file = e.target.files[0];
      this.imagen = file;
      this.cargarImagen(file);
    },

    cargarImagen(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenMiniatura = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    borrarImagen() {
      this.imagenMiniatura = "";
    },

    getItemAdmin() {
      const isAdmin = JSON.parse(localStorage.getItem("admin"));
      if (!isAdmin) {
        this.$router.push("/");
      }
    },

    comprobarModo() {
      if (this.$route.params.id) {
        this.productoId = this.$route.params.id;
        this.getProdById();
      }
    },

    getProdById() {
      const prodRef = ref(database, `productos/${this.productoId}`);
      onValue(prodRef, (snapshot) => {
        this.producto = snapshot.val();
        this.imagenMiniatura = this.producto.urlImagen;
      });
    },

    borrarProdById() {
      const prodRef = ref(database, `productos/${this.productoId}`);
      remove(prodRef);
      console.log("Borrado");
      this.$router.push("/adminprods");
    },

    pressed() {
      this.addProd();
    },

    getFormValues(values) {
      this.formErrors = [
        { nombre: { value: false } },
        { precio: { value: false } },
        // ...
      ];
      const nombre = values.target.elements.nombre.value;
      const precio = values.target.elements.precio.value;
      // TODO declarar todas las variables del formulario
      const allValues = {
        nombre,
        precio,
        // ...
      };
      const errors = this.validateForm(allValues);
      if (errors.find((validacion) => !!validacion.value)) return;
      else this.addProd();
    },

    validateForm(allValues) {
      const { nombre, precio } = allValues;
      if (nombre == "") this.formErrors.nombre.value = true;
      // igual con todos

      return this.formErrors;
    },
  },

  computed: {},
};
</script>

<style>
.form-addprod .alert-danger {
  max-width: fit-content;
}
.form-addprod .form-group {
  margin-bottom: 20px;
}
.form-addprod label {
  margin-bottom: 10px;
}
.form-addprod select,
.form-addprod input {
  height: 46px;
}
.form-addprod textarea {
  resize: vertical;
  max-height: 200px;
}
.form-addprod .required:after {
  content: "*";
  color: red;
}
.uploadFile {
  position: relative;
}
.uploadFile input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
