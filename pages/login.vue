<template>
  <div>
    <div>
      <form @submit.prevent="handleClickLogin">
        <div class="row ">
          <div class="col-md-6 mt-5 mx-auto">
            <div class="form-group">
              <div><h3 class="h1 mb-3 font-weight-bold">Sign in</h3></div>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required|email" v-slot="{errors}">
                <div><h3>E-mail</h3></div>
                <input v-model="email" type="text" class="form-control">
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider rules="required" v-slot="{errors}">
                <div><h3>Password</h3></div>
                <input v-model="password" type="password" class="form-control">
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <br/>
            <button class="btn btn-lg btn-primary btn-block " type="submit">Sign in</button>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import {ValidationProvider} from 'vee-validate';
  import vuex from 'vuex'


  export default {
    layout: "main",
    components: {
      ValidationProvider
    },
    data() {
      return {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      }
    },
    methods: {


          handleClickLogin(){
            console.log(this.email,this.password)
            this.$store.dispatch('login',{
              email: this.email,
              password: this.password,
            }).then(success =>{
              console.log('Loginsuccess')
              this.$router.push("/home")
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

  }

</style>
