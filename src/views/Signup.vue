<template>
  <div class="container">
    <div class="wrapper my-5">
      <toast
        v-if="showToast"
        :texto="'El usuario se ha creado correctamente'"
        :estado="'success'"
      />
      <form class="form-signin" @submit.prevent="pressed">
        <h2 class="form-signin-heading">Introduzca sus datos</h2>
        <input
          type="text"
          v-model="nombre"
          class="form-control"
          name="displayName"
          placeholder="Nombre"
          @keydown="clearError"
          required
        />
        <input
          type="text"
          v-model="email"
          class="form-control mt-3"
          name="email"
          placeholder="Correo electrónico"
          @keydown="clearError"
          required
        />
        <input
          type="password"
          v-model="password"
          class="form-control mt-3"
          name="password"
          placeholder="Contraseña"
          @keydown="clearError"
          required
        />
        <div class="form-check form-switch mb-4">
          <input
            class="form-check-input"
            type="checkbox"
            id="admin"
            v-model="admin"
          />
          <label class="form-check-label" for="admin">Soy una tienda</label>
        </div>

        <div class="alert alert-danger my-4" role="alert" v-if="errorForm">
          {{ errorForm }}
        </div>
        <button class="btn btn-lg btn-info btn-block" type="submit">
          Crear cuenta
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database";
import { database } from "../Firebase";
import Toast from "../components/Toast.vue";

export default {
  components: {
    Toast,
  },
  methods: {
    async pressed() {
      this.showToast = false;
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(database, `usuarios/${user.uid}`), {
            nombre: this.nombre,
            correo: user.email,
            admin: !!this.admin,
          });
          this.showToast = true;
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
              this.errorForm = "El formato del email es incorrecto";
              break;
            case "auth/user-not-found":
              this.errorForm =
                "No se ha encontrado un usuario con estas credenciales";
              break;
            case "auth/wrong-password":
              this.errorForm = "La contraseña es incorrecta para este usuario";
              break;
            case "auth/weak-password":
              this.errorForm = "La contraseña debe tener mínimo 6 caracteres";
              break;
            case "auth/email-already-in-use":
              this.errorForm = "El email ya ha sido registrado";
              break;
            default:
              this.errorForm = "Las credenciales son incorrectas";
              break;
          }
        });
    },
    clearError() {
      this.errorForm = "";
    },
  },

  data() {
    return {
      nombre: "",
      email: "",
      password: "",
      admin: "",
      errorForm: "",
      showToast: false,
    };
  },
};
</script>

<style>
body {
  background: #eee !important;
}

.form-signin {
  box-shadow: 0px 4px 10px lightgray;
  max-width: 600px;
  padding: 25px 35px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.form-signin-heading {
  margin-bottom: 30px;
}

.form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  @include box-sizing(border-box);
}

input[type="text"] {
  margin-bottom: -1px;
  border-radius: 4px;
}

input[type="password"] {
  margin-bottom: 20px;
  border-radius: 4px;
}
</style>
