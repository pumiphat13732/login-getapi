import * as axios from 'axios';

export const state = () => ({
  token: localStorage.getItem('access_token') || '',

  counter: 0
})
export const mutations = {
  increment(state) {
    state.counter++
  },
  login(state, token) {
    state.token = token
    console.log(state.token)
  },
  register(state, token) {
    state.token = token
    console.log(state.token)
  },
  destroyToken(state) {
    state.token = ''
    localStorage.removeItem('access_token')
  }

}
export const actions = {
  login: ({commit}, {email, password}) => {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/login', {email, password})
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.token)
            commit('login', response.data.token)
            resolve(true)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  register: ({commit}, {email, password}) => {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/Register', {email, password})
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.token)
            commit('register', response.data.token)
            resolve(true)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout: ({commit}) => {
    commit('destroyToken')
  }
}

