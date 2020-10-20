<template>
    
    
    <h1>Editar Tags</h1>
    <a href="/tag">Volver</a>

    <form @submit.prevent="guardar">

        <label for="nombre">Nombre</label>
        <input type="text" v-model="nombre" > 
        <button type="submit">Guardar</button>

    </form>

</template>


<script>

import axios from 'axios'


export default {
    name : 'CreateTag',
    data(){
        return{
            nombre: '',
            id: null,
            token: null,
        };
    },

    mounted (){

    this.token = localStorage.getItem('token');
    this.id = this.$route.params.id
     axios.get("http://localhost:1337/tags/" + this.id,{
              
         headers: {
            'Authorization': 'Bearer ' + this.token,
         
      },

      }).then((response) => {
          this.nombre = response.data.nombre
      })
    },
    methods:{
            guardar() {
         
            axios.put("http://localhost:1337/tags/" + this.id,{
                nombre: this.nombre,
            },
            {
                 headers: {
            'Authorization': 'Bearer ' + this.token
         
      },

            })
            
            .then((response) => {
                this.$router.push('/tag')
            })
        }
    
    }

   
}
</script>