<template>
  <div>
    <div id="hidden">
      <ValidationProvider rules="required" v-slot="{errors}">
        <div style="margin-top: 10px"><h1 style="color: #3b8070">Login</h1></div>
        <div style="margin-top: 10px"><h3 style="color: orangered">E-mail</h3></div>
        <input v-model="email" type="text" style="margin-top: 10px">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider rules="required" v-slot="{errors}">
        <div style="margin-top: 10px"><h3 style="color: orangered">Password</h3></div>
        <input v-model="password" type="password" style="margin-top: 10px">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br/>
      <button style="margin-top: 10px; margin-bottom: 50px; color: aquamarine;" @click="handleClickLogin">Login</button>
    </div>
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
  </div>
</template>

<script>
  import {ValidationProvider} from 'vee-validate';
  import vuex from 'vuex'


  export default {
    components: {
      ValidationProvider
    },
    data() {
      return {
        data: '',
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
        results: []
      }
    },
    methods: {
      gologin() {
        document.getElementById("show").style.visibility = "visible";
        document.getElementById("hidden").style.display = "none";
        const url = `https://reqres.in/api/users`
        axios.get(url).then((res) => {
          console.log(res.data.data)
          this.results = res.data.data
        })
      },

          handleClickLogin(){
            console.log(this.email,this.password)
            this.$store.dispatch('Login',{
              email: this.email,
              password: this.password,
            }).then(success =>{
              console.log('success')
            })
            .catch(error =>{
              console.log(error)
              // console.log(error.response.data)
              // console.log(error.response.status)
              // console.log(error.response.headers)

            })

          }
    }

  }
</script>
<style scoped lang="css">
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
    visibility: hidden;
  }

</style>
