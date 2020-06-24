<template>
  <div style="margin: 10%">
    <div>Counter is : {{$store.state.counter }}</div>
    <div>
      <button @click="increment" style="margin-top: 10px"> Add data</button>
    </div>
    <login></login>

  </div>

</template>
<script>
  import {mapState} from 'vuex'
  import Login from "./login"

  export default {
    // fetch(context) is called by the server-side
    // and before instantiating the component
    components: {
      Login
    },
    data() {
      return {
        value: ''
      }

    },
    fetch({store}) {
      store.commit('increment')
    },
    computed: mapState([
      'counter'
    ]),
    methods: {
      increment() {
        this.$store.commit('increment')
      }
    }
  }
</script>
