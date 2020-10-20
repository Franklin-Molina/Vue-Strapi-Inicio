<template>
    
    
    <h1>Crear Nueva Tag</h1>
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
        };
    },

    methods:{
        
        guardar() {
            const tokenverificacion = localStorage.getItem('token')
            axios.post("http://localhost:1337/tags",{
                nombre: this.nombre,
            },
            {
                 headers: {
            'Authorization': 'Bearer ' + tokenverificacion
         
      },

            })
            
            .then((response) => {
                this.$router.push('/tag')
            })
        }
    }

   
}
</script>