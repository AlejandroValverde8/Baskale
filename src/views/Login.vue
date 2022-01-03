<template>
    <div class="container">
        <div class="wrapper">
            <form class="form-signin" @submit.prevent="pressed">       
                <h2 class="form-signin-heading">Introduzca sus credenciales</h2>
                <button class="btn btn-info btn-block" @click="signup()"> Resgistrarse </button><br/>
                <input type="text" v-model="email" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
                <input type="password" v-model="password" class="form-control" name="password" placeholder="Password" required=""/>      
                <label class="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Recuérdame 
                </label>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
            </form>
        </div>
    </div>
</template>

<script>
    import * as firebase from "firebase/app";
    import * as atuen from "firebase/auth";
    import {database} from "../Firebase"; 
    import { getDatabase, ref, onValue } from 'firebase/database';
    
    export default {
        methods:{
          async pressed(){
              const auth = atuen.getAuth();
              atuen.signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
                //console.log(userCredential);
                

                //Buscar usuario actual en la bbdd

                this.readUser(userCredential.user.uid);
                this.$router.push('/usuario/{{this.email}}');
              }, (error)=> {
                console.log(error.message);
              }
              );
            
          },
            signup(){
                this.$router.push('/signup');
            },
            signupshop(){
              this.$router.push('/signup');
            },

            readUser(userId){
                const usuario =  ref(database, `usuarios/${userId}`);
                onValue(usuario, (snapshot) => {
                    const user = snapshot.val();
                    console.log(user);
                    localStorage.setItem('admin', user.admin);
                 });
            },
        },
        data(){
          return{
            email:'',
            password:'',
            error:''
          }
          
        }
    }
</script>

<style>

    body {
	background: #eee !important;	
}

.wrapper {	
	margin-top: 80px;
  margin-bottom: 80px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.1);  
}
  .form-signin-heading,
	.checkbox {
	  margin-bottom: 30px;
	}

	.checkbox {
	  font-weight: normal;
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
	  border-bottom-left-radius: 0;
	  border-bottom-right-radius: 0;
	}

	input[type="password"] {
	  margin-bottom: 20px;
	  border-top-left-radius: 0;
	  border-top-right-radius: 0;
	}

</style>