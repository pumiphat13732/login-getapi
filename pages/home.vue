<template>
  <div class="grid-card" id="show">
    <div
      v-for="i in results"
      :key="i.data"
      class="card"
    >
      <img :src="i.avatar" alt="">
      <h3>{{i.email}}</h3>
      <h3>{{i.first_name}}</h3>
      <h3>{{i.last_name}}</h3>
      <h3>id:{{i.id}}</h3>
    </div>
  </div>
</template>

<script>
  import * as axios from 'axios'
  import vuex from 'vuex'
  export default {
    layout: 'main',
    name: "home",
    middleware:'auth',
    fetch() {
    this.gologin()
    },
    data() {
      return {
        data: '',
        results: []
      }
    },
    methods: {
      gologin() {
        const url = 'https://reqres.in/api/users'
        axios.get(url).then((res) => {
          console.log(res.data.data)
          this.results = res.data.data
        })
      }

    }
  }
</script>

<style scoped>
  .card {
    padding: 20px 20px 20px 20px;
    margin: 20px 20px 20px 20px;
    background: #ffffff;
    border-radius: 10px;
  }

  .card h3 {
    margin-top: 10px;
  }

  .card img {
    margin: auto;
  }

  .grid-card {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background-color: #BEE9E8;
    padding: 10px;
    border-radius: 10px;

  }

</style>
