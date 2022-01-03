<template>
    <div class="container">
       <div class="wrapper">
            <form class="form-signin" @submit.prevent="pressed">       
                <h2 class="form-signin-heading">Introduzca sus datos</h2>
                <input type="text" v-model="email" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
                <input type="password" v-model="password" class="form-control" name="password" placeholder="Password" required=""/>      
                <label class="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Recuérdame 
                </label>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>   
            </form>
        </div>
    </div>
</template>

<script>		

	import * as firebase from "firebase/app";
	import "firebase/auth";
	import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
	import { getDatabase, set, ref, onValue, push} from "firebase/database";
    import {database} from "../Firebase";
	
	export default {
		methods:{
			async pressed(){
				try{
					const auth = getAuth();
					createUserWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
						const user = userCredential.user;
						console.log(user.uid);
						set(ref(database, `usuarios/${user.uid}`),{
							//nombre: 
							correo: user.email,
                    		admin: false
                    
                		});
					})
					
				}catch(err){
					console.log(err);
				}
				
			}
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