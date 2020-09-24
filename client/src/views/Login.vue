<template>
    <div id="login-page">
        <div class="container">
        <div class="form-container bg-dark">
            <div class="heading">
                <h2 class="font-weight-bold">Login to your account</h2>
            </div>
            <div class="form-box">
                <form @submit.prevent="login">
                    <div class="form-input">
                        <span><font-awesome-icon icon="envelope" /></span>
                        <input type="email" placeholder="Email Address" v-model="email" >
                    </div>
                    <div class="form-input">
                        <span><font-awesome-icon icon="lock" /></span>
                        <input type="password" placeholder="Password" v-model="password" >
                    </div>
                    <div style="text-align: left;">
                        <button type="submit" class="btn">Login</button>
                    </div>
                </form>
            </div>
            <div class="text-white mt-3">
                Don't have any account? <router-link to="/register">Register here</router-link>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
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
      const data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginAccount', data)
    }
  }
}
</script>

<style>

</style>
