<template>
  <h1>Listado de Tags</h1>

  <a href="/tag/create">Crear </a> <br />

  <input type="text" v-model="search" placeholder="Buscar" />
  <table>
    <thead>
      <tr>
        <td>ID</td>
        <td>Nombre</td>
        <td>Acciones</td>
        <button @click="CambiarOrden">Cambiar orden</button>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tag in tags" :key="tag.id">
        <td>{{ tag.id }}</td>
        <td>{{ tag.nombre }}</td>
        <td>
          <a :href="`/tags/${tag.id}/edit`">Editar</a>
          <a href="#" @click="eliminar(tag.id)">Eliminar</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
import debounce from "debounce";
export default {
  name: "Tags",
  data() {
    return {
      tags: [],
      search: "",
      default_sort: "nombre:ASC",
    };
  },

  mounted() {
    this.traerTags = debounce(this.traerTags, 600); //buscar
    this.traerTags();
  },
  /*Para buscar*/
  watch: {
    search(value) {
      this.traerTags(value);
    },
  },

  methods: {
    traerTags(search = null) {
      let params = {
        _sort: this.default_sort,
      };

      if (search && search != "") {
        params.nombre_contains = search;
      }

      axios
        .get("http://localhost:1337/tags", {
          params,
        })
        .then((response) => {
          this.tags = response.data;
        });
    },

    eliminar(id) {
      axios
        .delete("http://localhost:1337/tags/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.traerTags();
        });
    },
    CambiarOrden() {
      if (this.default_sort == "nombre:ASC") {
        this.default_sort = "nombre:DESC";
      } else {
        this.default_sort = "nombre:ASC";
      }
      this.traerTags();
    },
  },
};
</script>