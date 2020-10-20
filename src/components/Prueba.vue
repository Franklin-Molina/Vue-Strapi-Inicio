<template>
    
    <b-container >
        <div v-if="galeria.length">
            <b-row>
                <div v-bind="galeria.index" v-for="items in galeria"  :key="items.id">

                    <b-card v-bind:img-src="items.url[0].url">

                    </b-card>
                </div>
            </b-row>
        </div >
        <div v-else>
            <p>Sin datos</p>
        </div>
    </b-container>
</template>


<script>
export default {
    data(){
        return{
            galeria:[],
        };
    },
    mounted(){
        fetch("http://localhost:1337/imagenes").then(
            (res)=> res.json()
        ).then((data) => {
            this.galeria = data;
        });
    }
}
</script>