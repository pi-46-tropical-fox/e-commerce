<template>
    <div id="register-page">
        <div class="container">
        <div class="form-container bg-dark">
            <div class="heading">
                <h2 class="font-weight-bold">Create Account</h2>
            </div>
            <div class="form-box">
                <form @submit.prevent="register">
                    <div class="form-input">
                        <div class="row">
                          <div class="col">
                            <input type="text" class="form-control" style="padding-left: 20px;" placeholder="First name" v-model="firstName">
                          </div>
                          <div class="col">
                            <input type="text" class="form-control" style="padding-left: 20px;" placeholder="Last name" v-model="lastName">
                          </div>
                        </div>
                    </div>
                    <div class="form-input">
                        <span><font-awesome-icon icon="envelope" /></span>
                        <input type="email" placeholder="Email Address" v-model="email" >
                    </div>
                    <div class="form-input">
                        <span><font-awesome-icon icon="lock" /></span>
                        <input type="password" placeholder="Password" v-model="password" >
                    </div>
                    <div style="text-align: left;">
                        <button type="submit" class="btn">Register</button>
                    </div>
                </form>
            </div>
            <div class="text-white mt-3">
                Have an account? <router-link to="/login">Login here</router-link>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('registerAccount', data)
    }
  }
}
</script>

<style>

</style>
