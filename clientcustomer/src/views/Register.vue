<template>
   <div class="container mr-auto ml-auto col-6">
     <br>
    <img src="https://bily.io/img/login.svg" alt="">
    <div class="row d-flex flex-column m-3">
      <h3>Register</h3>
      <label>Email :</label>
      <input label="Email" type="text" v-model="email" class="form-control" />
      <label>Password :</label>
      <input :type="showPassword?'text':'password'" v-model="password" class="form-control" />
      <div class="form-group form-check">
        <input type="checkbox" v-model="showPassword" />Show Password
        <label class="form-check-label" for="exampleCheck1"></label>
      </div>
      <button type="submit" class="btn btn-primary btn-block" @click.prevent="registerUser">Register</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
export default {
  data () {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    registerUser () {
      axios({
        method: 'POST',
        // url: 'http://localhost:3000/register',
        url: 'https://server-ecommerce-syukur.herokuapp.com/register',
        data: {
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        // localStorage.setItem('access_token', response.data.access_token)
        Toast.fire({
          icon: 'success',
          title: 'Succes register...!'
        })
        this.$router.push({ name: 'Login' })
      })
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
</style>
