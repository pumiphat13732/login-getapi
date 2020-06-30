<template>
  <div>
    <div class="topnav">
      <a class="active" href="/home">Home</a>
      <a v-if="$store.state.token == ''" href="/login">Login</a>
      <a v-if="$store.state.token == ''" href="/register">Register</a>
      <a v-if="$store.state.token != ''" href="/login" @click="handleClickLogout">Logout</a>
      <a v-if="$store.state.token != ''" >Token:{{$store.state.token}}</a>


    </div>
    <nuxt/>
  </div>
</template>

<script>
  export default {
    name: 'main',
    methods: {
      async handleClickLogout() {
        await this.$store.dispatch('logout')
        this.$router.push('/home')
      }
    }
  }
</script>

<style lang="css" scoped>
  .topnav {
    background-color: #333;
    overflow: hidden;
  }

  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  /* Change the color of links on hover */
  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }

  /* Add a color to the active/current link */
  .topnav a.active {
    background-color: #4CAF50;
    color: white;
  }
</style>
