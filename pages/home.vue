<template>
  <div>
    <div class="posbtn">
      <div class="postion">
        <button type="button" class="btn btn-light" @click="createuser">Create</button>
        <button type="button" class="btn btn-light">Update</button>
        <button type="button" class="btn btn-light">Delete</button>
      </div>
      <br>
      <br>
      <form @submit.prevent="createusertable" v-if="hidetable !=0">
        <p class="postion">E-mail</p>
        <input class="postion" type="text" v-model="email">
        <p class="postion">Username</p>
        <input class="postion" type="text" v-model="name">
        <p class="postion">Lastname</p>
        <input class="postion" type="text" v-model="lastname">
        <p class="postion">Job</p>
        <input class="postion" type="text" v-model="job">
        <br><br>
        <button type="submit" class="btn btn-success postion">Summit</button>
      </form>
    </div>

    <div v-if="hidetable2 ==3">

      <table id="customers">
        <tr>
          <th>CreatedAt</th>
          <th>ID</th>
          <th>UserName</th>
          <th>Job</th>
        </tr>
        <tr v-for="j in usercreatetable " :key="j.usercreatetable">
          <td>{{j.createdAt}}</td>
          <td>{{j.id}}</td>
          <td>{{j.name}}</td>
          <td>{{j.job}}</td>
        </tr>
      </table>
    </div>

    <div
    >
      <table id="customers" v-if="hidetable != 1">
        <tr>
          <th>Avatar</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>ID</th>
        </tr>
        <tr v-for="i in results"
            :key="i.data">
          <td><img :src="i.avatar" alt=""></td>
          <td>{{i.email}}</td>
          <td>{{i.first_name}}</td>
          <td>{{i.last_name}}</td>
          <td>{{i.id}}</td>
        </tr>
      </table>
    </div>

    <div class="btn-position" v-if="hidetable != 1">
      <<:
      <a v-for="n in total_pages"
         id="myDIV"
         class="a-page"
         href="#"
         @click="changevalue(n)"
      >{{n}}
      </a>
      :>>
    </div>

  </div>
</template>

<script>
  import * as axios from 'axios'
  import vuex from 'vuex'

  export default {
    layout: 'main',
    name: "home",
    middleware: 'auth',
    fetch() {
      this.getdata()
    },
    data() {
      return {
        data: '',
        results: [],
        total_pages: '',
        pageOn: 1,
        showtable: 0,
        hidetable: 0,
        hidetable2: 0,
        email: '',
        name: 'morpheus',
        lastname: '',
        userdata: [],
        job: 'leader',
        usercreatetable: [],

      }
    },
    methods: {
      async getdata() {
        await axios.get('https://reqres.in/api/users', {params: {page: this.pageOn}})
          .then((res) => {
            this.results = res.data.data
            console.log('data', res.data.data)
            this.total_pages = res.data.total_pages
            console.log('data', res.data.total_pages)
          })
      },
      changevalue(value) {
        this.pageOn = value
        this.getdata()
      },
      createuser() {
        this.hidetable = 1
        this.hidetable2 = 1
      },
      async createusertable() {
        this.userdata.push({name: this.name, job: this.job})
        await axios.post('https://reqres.in/api/users', {
          name: this.name,
          job: this.job
        }).then((res) => {
          if (res.status === 201) {
            // this.usercreatetable = res.data
            this.usercreatetable.push(res.data)
            console.log('res',res)
            console.log('tabledata', this.usercreatetable)

          }
        })
        this.hidetable2 = 3

      },
      updateuser() {
      },
      deleteuser() {
      },

    }
  }

</script>

<style scoped lang="scss">
  /*.card {*/
  /*  padding: 20px 20px 20px 20px;*/
  /*  margin: 20px 20px 20px 20px;*/
  /*  background: #ffffff;*/
  /*  border-radius: 10px;*/
  /*  text-align: center;*/
  /*  !*display: table;*!*/
  /*}*/
  .postion {
    margin-top: 5px;
    margin-left: 20px;
  }

  .card {
    margin: 20px auto;
  }

  #customers {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 50%;
    margin: 0 auto;

  }

  #customers td, #customers th {
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    /*text-align: left;*/
    background-color: #4CAF50;
    color: white;
  }

  .btn-position {
    margin: 0 2px 10px 2px;
    text-align: center;
  }

  .a-page {
    margin: 10px 4px 10px 4px;
  }

  .posbtn {
    margin: 10px auto;
  }

</style>
