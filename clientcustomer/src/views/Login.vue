<template>
   <div class="container mr-auto ml-auto col-6">
    <img src="https://bily.io/img/login.svg" alt="">
    <h1>Login Page</h1>
    <div class="row d-flex flex-column m-3">
      <label>Email :</label>
      <input label="Email" type="text" v-model="email" class="form-control" />
      <label>Password :</label>
      <input :type="showPassword?'text':'password'" v-model="password" class="form-control" />
      <div class="form-group form-check">
        <input type="checkbox" v-model="showPassword" />Show Password
        <label class="form-check-label" for="exampleCheck1"></label>
      </div>
      <button type="submit" class="btn btn-primary btn-block" @click.prevent="loginUser">Submit</button>
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
  onOpen: (toast) => {
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
    loginUser () {
      axios({
        method: 'POST',
        // url: 'http://localhost:3000/login',
        url: 'https://server-ecommerce-syukur.herokuapp.com/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then((response) => {
          // console.log('contetnt >>', response.status)
          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('username', this.email)
            this.$store.state.isUser = true
            this.$router.push({ name: 'Home' })
            Toast.fire({
              icon: 'success',
              title: `Welcome Back! ${this.email}`
            })
          }
        })
        .catch(() => {
          console.log('Failed Login')
          Toast.fire({
            icon: 'error',
            title: 'Invalid Email or Password'
          })
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
