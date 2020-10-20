<template>
  <div>
    <div>
      <div class="text-center">
            <a href="/index" title="Home — Unsplash">
              <img class="login__logo" src="../assets/login.png">
            </a>
            <h1 class="login__title">Login</h1>
            <p class="login__subtitle">Welcome back.</p>
          </div>
    </div>
   
  
    <div class="container ">
    
         <form @submit.prevent="login">
    
      <div>
        <label class="mt-3" for="email">Email</label> <br>
        <input  class="col-12" type="email" v-model="email" id="email" />
      </div>
      <div>
        <label for="password">Contraseña</label><br>
        <input  class="col-12" type="password" v-model="password" id="password" /> <br>
      </div>
      <div v-if="error">
    <div class=" mt-4 alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Error  !</strong> Tus credeciales son invalidas
  <button type="button" class="close " data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span> <br>
  </button>
</div>
      </div>
      <button  type="submit"  id="color" class="  mt-4 mb-2 btn btn-dark btn-lg btn-block">Ingresar</button>
      <button  type="submit"  id="color" class="  mt-4 mb-2 btn btn-dark btn-lg btn-block">Registrase</button>
     

    </form>

     
   
    </div>


  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password:'',
      error:false,
    }
  },
  methods:{
    login(){
      this.error=false
     fetch('http://localhost:1337/auth/local/',{
       method:'POST',
       headers:{
         'Content-Type':'application/json'
       },
       body: JSON.stringify({
         identifier: this.email,
         password:this.password
       }),

     }).then(async(response) =>{
       if(!response.ok){
         throw await response.json()
       }
       return response.json()
     })
     .then((data)=>{
       localStorage.setItem('token', data.jwt)
       localStorage.setItem('user', JSON.stringify(data.user))
       this.$router.push('/')
     })
     .catch((err) =>{
       this.error=true
     });

    }
  }
};
</script>

<style >

.container {
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	overflow: hidden;
	width: 500px;
	max-width: 100%;
}
#color{
  background: black;
}
  
</style>

