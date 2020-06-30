<template>
  <div>
    <div class="posbtn">
      <div class="postion">
        <button type="button" class="btn btn-light" @click="createUser">Create</button>
      </div>
      <br>
      <br>
      <form @submit.prevent="createUserTable" v-if="hidetable !=0">

        <p class="postion">E-mail</p>
        <ValidationProvider rules="required|email" v-slot="{errors}">
          <input class="postion" type="text" v-model="email">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <p class="postion">Username</p>
        <ValidationProvider rules="required" v-slot="{errors}">
          <input class="postion" type="text" v-model="name">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <p class="postion">Lastname</p>
        <ValidationProvider rules="required" v-slot="{errors}">
          <input class="postion" type="text" v-model="lastname">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <p class="postion">Job</p>
        <ValidationProvider rules="required" v-slot="{errors}">
          <input class="postion" type="text" v-model="job">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
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
      <table id="customers" v-if="hidetable !== 1">
        <tr>
          <th>Body</th>
          <th>ID</th>
          <th>Title</th>
          <th>UserID</th>
          <th>Option</th>

        </tr>

        <tr v-for="n in printData(results)">
          <td>{{n.body}}</td>
          <td>{{n.id}}</td>
          <td>{{n.title}}</td>
          <td>{{n.userId}}</td>
          <b-button class="postion1" @click="getDetail(n)">Detail</b-button>
          <b-button class="postion1" @click="getEdit(n)">Edit</b-button>
          <b-button class="postion1" @click="getDelete(n)">Delete</b-button>
        </tr>


      </table>
    </div>

    <div class="btn-position" v-if="hidetable != 1">
      <
      <:
      <a v-for="n in (Math.ceil(datasize/pagesize))"
         id="myDIV"
         class="a-page"
         href="#"
         @click="changeValue(n)"
      >{{n}}
      </a>
      :>>
    </div>

  </div>
</template>

<script>
  import * as axios from 'axios'
  import vuex from 'vuex'
  import {ValidationProvider} from "vee-validate";

  export default {
    layout: 'main',
    middleware: 'auth',
    components: {
      ValidationProvider
    },
    fetch() {
      this.getData()
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
        job: 'leader',
        usercreatetable: [],
        pagesize: 10,
        datasize: []

      }
    },
    methods: {
     getDetail(n){
       this.$router.push('userProfile')
     },
      async getDelete(index) {
        console.log(index.id)
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${index.id}`)
          .then((res) => {
            if (res.status == 200) {
              console.log('delete_success')
            }
          })
        this.results = this.results.filter(result => {
          if (result.id !== index.id) {
            return result
          }
          this.upDateDataSize()
        })

        // console.log( index.id-1)
        // console.log(index.id)
      },
      upDateDataSize() {
        this.datasize = this.datasize - 1
        // this.datasize  = this.results.length
        console.log(this.datasize)

      },
      printData(results) {
        {
          return results.slice((this.pagesize * this.pageOn) - 10, this.pagesize * this.pageOn)
        }
      },
      async getData() {
        await axios.get('https://jsonplaceholder.typicode.com/posts')
          .then((res) => {
            this.results = res.data
            console.log('data', res.data)
            this.datasize = res.data.length
            console.log('data', this.datasize)
          })
      },
      changeValue(value) {
        this.pageOn = value
      },
      createUser() {
        this.hidetable = 1
        this.hidetable2 = 1
      },
      async createUserTable() {
        this.userdata.push({name: this.name, job: this.job})
        await axios.post('https://reqres.in/api/users', {
          name: this.name,
          job: this.job
        }).then((res) => {
          if (res.status === 201) {
            this.usercreatetable.push(res.data)
            console.log('res', res)
            console.log('tabledata', this.usercreatetable)

          }
        })
        this.hidetable2 = 3

      }

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
  .postion1 {
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }

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
