<template>
<div class="register-form-container">
<form @submit.prevent='register'>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
    
</template>
<script>
import axios from '../config/axios.js'
export default {
  name: 'RegsiterForm',
  data () {
      return {
          email: '',
          password: ''
      }
  },
  methods: {
      register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      console.log(payload, '<<< ini fari component LoginForm')
      this.$store.dispatch('registerClient', payload)
    }
  }
}
</script>

<style>
.register-form-container {
border-radius: 35px;
box-shadow:  5px 5px 10px #014a84, -5px -5px 10px #0164b2;
color: antiquewhite;
padding: 25px;
}

</style>
