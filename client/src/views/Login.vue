<template>
  <div class="register-page">
    <!-- <div class="image-show">
      <img src="..\assets\logo.jpg" alt="">
    </div> -->
    <div class="register-container">
      <h1>Login</h1>
      <p v-for="(alert, index) in loginAlert" :key='index'>{{alert}}</p>
      <form action="">
        <label for="">Email</label>
        <!-- <br> -->
        <input type="email" v-model="email">
        <br>
        <label for="">Password</label>
        <!-- <br> -->
        <input type="password" v-model="password">
        <br><br>

        <button class="btn btn-secondary" @click.prevent="login">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then((isLogin) => {
          console.log(isLogin)
          if (isLogin) {
            this.email = ''
            this.password = ''
            swal("Hey there! You're successfully login, press OK to proceed.")
              .then((value) => {
                this.$router.push('/')
              })
          }
        })
    }
  },
  computed: {
    loginAlert () {
      return this.$store.state.loginAlert
    }
  }
}
</script>

<style>

</style>
