<template>
  <div class="container">
    <div class="wrapper my-5">
      <form class="form-signin" @submit.prevent="pressed">
        <h2 class="form-signin-heading">Introduzca sus datos</h2>
        <input
          type="text"
          v-model="email"
          class="form-control"
          name="username"
          placeholder="Email Address"
          @keydown="clearError"
          required
        />
        <input
          type="password"
          v-model="password"
          class="form-control mt-3"
          name="password"
          placeholder="Password"
          @keydown="clearError"
          required
        />
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

export default {
  methods: {
    async pressed() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.uid);
          set(ref(database, `usuarios/${user.uid}`), {
            // nombre:
            correo: user.email,
            admin: false,
          });
        })
        .catch((err) => {
          console.log(err.code);
          switch (err.code) {
            case "auth/invalid-email":
              this.errorForm = "El formato del email es incorrecto";
              break;
            case "auth/user-not-found":
              this.errorForm = "No se ha encontrado un usuario con estas credenciales";
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
      email: "",
      password: "",
      errorForm: "",
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
