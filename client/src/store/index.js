import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstant'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data : [],
    cartData:[]
  },
  mutations: {
    setData(state, newData){
      state.data = newData
    },
    getData (state,newData){
      state.cartData = newData
    },
    deleteCart (state, id){
      state.cartData = state.cartData.filter(el =>{
        return el.id !== id
      })
    }
  },
  actions: {
    login({commit}, payload){
      axios
        .post('/login', payload)
        .then(({data}) =>{
          localStorage.setItem('access_token', data.access_token)
        })
        .catch(err =>{
          console.log(err)
          Swal.fire('Oops','Email or Password is Invalid')
        })
    },
    register({commit}, payload){
      axios
        .post('/register', payload)
        .then(({data}) =>{
          console.log(data)
        })
        .catch(err =>{
          console.log(err)
        })
    },
    fetchData({commit}){
      axios
        .get('/')
        .then(({data}) =>{
          commit('setData', data)
        })
        .catch(err =>{
          console.log(err)
        })
    },
    addToCart({commit}, id){
      axios({
        method:'POST',
        url:`/carts/${id}`,
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(({data})=>{
        console.log(data)
        Swal.fire('Succesed','Your Item Has Been Added to Cart')
      })
      .catch(err =>{
        console.log(err)
          Swal.fire('Oops','Out of Stock')
      })
    },
    fetchCart({commit}){
      axios
        .get('/carts',{
          headers:{access_token: localStorage.getItem('access_token')}
        })
        .then(({data}) =>{
          commit('getData', data)
        })
        .catch(err =>{
          console.log(err)
        })
    },
    removeId({commit}, id){
      axios
        .delete(`/carts/${id}`, {
          headers:{ access_token: localStorage.getItem('access_token')}
        })
        .then(({data}) =>{
          commit('deleteCart', id)
          Swal.fire('succes','remove item')
        })
        .catch(err =>{
          console.log(err)
        })
    },
    editQuantity({commit}, payload){
      axios
        .patch(`/carts/quantity/${payload.id}`, payload.payload,{
          headers:{ access_token: localStorage.getItem('access_token')}
        })
        .then(({data}) =>{
          Swal.fire('succes','Edit quantity item')
        })
        .catch(err =>{
          console.log(err)  
        })
    },
    checkout({commit}){
      axios({
        method:'PATCH',
        url:`/carts`,
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(({data})=>{
        Swal.fire('succes','Checkout')
      })
      .catch(err =>{
        Swal.fire('Oops','Out Of Stock')
      })
    }
  },
  modules: {
  }
})
