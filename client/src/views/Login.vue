<template>
  <div>
    <div class="container mx-auto p-3 mt-5 animate__animated animate__fadeIn">
      <div class="card mx-auto shadow" style="width: 25rem; border-radius: 10px">
        <img style="border-top-left-radius: 10px; border-top-right-radius: 10px" src="https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80" class="card-img-top" alt="" />
        <div class="container p-2 shadow bg-light" style="width: 80%; margin-top: -100px; border-radius: 5px">
            <h2>Sign In</h2>
            <form>
            <input type="email" v-model="email" class="form-control mb-2" placeholder="Email">
            <input type="password" v-model="password" class="form-control" placeholder="Password">
            <button type="button" class="btn btn-primary btn-block mt-4 mb-2" @click.prevent="login">Sign In</button>
            </form>
            <button v-google-signin-button="clientId" class="google-signin-button btn btn-success btn-block"> Continue with Google</button>
        </div>
        <div class="card-body">
          <h5 class="card-title">Don't have an account? <a href="#" @click.prevent="$router.push({ path: '/register' })">Register</a></h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      clientId: '953795490728-4on335kjhdrvpupfckj0879d0f04rl4l.apps.googleusercontent.com'
    }
  },
  methods: {
    login () {
      console.log('login masuk ke methods')
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    },
    OnGoogleAuthSuccess (idToken) {
      // console.log(idToken)
      this.$store.dispatch('googleLogin', idToken)
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>
</style>
