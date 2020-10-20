<template>
 <h1>Bienvenido! {{user.email}}</h1>
 <button @click="salir"> Salir  </button>

 <div>
   <h1> Mis Imagenes</h1>

 </div>

  
  <div class="container mt-4">
    <div class="row">
      <div class="col-12"></div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-12 col-md-6 col-lg-4" v-for="items in galeria" :key="items.index">
        <Galeria :items="items" />

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Galeria from '@/components/Galeria.vue'

export default {
  name: 'Home',
  components: {
    Galeria
  },
  methods: {
    salir (){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  },
   data() {
    return {
      galeria: [],
      user: {}
    }
  },

  mounted(){
    this.user= JSON.parse(localStorage.getItem('user'))
    //recuperar el token para la Auth
    const tokenverificacion = localStorage.getItem('token')
    fetch('http://localhost:1337/imagenes/me',{
      headers: {
       'Authorization': 'Bearer ' + tokenverificacion
         
      }
    })
    .then( res=>res.json() )
    .then(data => {
      console.log(data)
    })
  },
  /* mounted() {
    fetch("http://localhost:1337/imagenes/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.galeria = data;
      });
  },*/
};
</script>
