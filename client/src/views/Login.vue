<template>
  <div class="container">

      <div class="col-6 text-alignment-center">
          <img src="https://bily.io/img/login.svg" alt="">
    <h1>Login Page</h1>
    <div class="row d-flex flex-column m-3">
      <label>Email :</label>
      <input label="Email" type="text" v-model="email" class="form-control" />
      <label>Password :</label>
      <input type="password" v-model="password" class="form-control" /><br>
      <input type="submit" @click.prevent="loginUser" class="btn btn-info"/>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: ''
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
      }).then((response) => {
        // console.log('>>>> response:', response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token)
        this.$router.push({ name: 'Product' })
      })
    }
  }
}
</script>
