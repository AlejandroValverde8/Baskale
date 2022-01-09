<template>
  <div class="container">
    <div class="wrapper my-5">
      <toast v-if="showToast" :texto="toast.texto" :estado="toast.estado" />
      <form class="form-signin" @submit.prevent="pressed">
        <h2 class="form-signin-heading">Introduzca sus credenciales</h2>
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
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Acceder
        </button>
        <div class="mt-4">
          No tienes cuenta ?
          <span class="link-register" @click="signup()"> Regístrate aquí</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as atuen from "firebase/auth";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";
import Toast from "../components/Toast.vue";

export default {
  components: {
    Toast,
  },
  methods: {
    async pressed() {
      this.showToast = false;
      const auth = atuen.getAuth();
      atuen
        .signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.readUser(userCredential.user.uid);
          this.toast = {
            texto: "El usuario se ha autentificado correctamente",
            estado: "success",
          };
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
            default:
              this.errorForm = "Las credenciales son incorrectas";
              break;
          }

          this.toast = {
            texto: "Error al autentificar usuario",
            estado: "danger",
          };
          this.showToast = true;
        });
    },
    signup() {
      this.$router.push("/signup");
    },
    clearError() {
      this.errorForm = "";
    },
    readUser(userId) {
      const usuario = ref(database, `usuarios/${userId}`);
      onValue(usuario, (snapshot) => {
        const user = snapshot.val();
        localStorage.setItem("adminName", user.nombre);
        localStorage.setItem("admin", user.admin);
        localStorage.setItem("logged", true);
        localStorage.setItem("uid", userId);
        this.$router.push(user.admin ? "/adminprods" : "/productos");
      });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      errorForm: "",
      toast: {
        texto: "",
        estado: "",
      },
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
  width: 600px;
  padding: 25px 35px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
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

.link-register {
  cursor: pointer;
  color: rgb(0, 110, 255);
}
.link-register:hover {
  text-decoration: underline;
}
</style>
