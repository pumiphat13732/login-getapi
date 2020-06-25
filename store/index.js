import * as axios from 'axios';

export const state = () => ({
  token:'',
  counter: 0
})
export const mutations = {
  increment(state) {
    state.counter++
  },
  login(state,token) {
    state.token = token
    console.log(state.token)
  }
}
export const actions = {
  Login: ({commit}, {email, password}) => {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/login', {email, password})
        .then((response) => {
          if (response.status === 200) {
            commit('login',response.data.token)
            resolve(true)

          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

