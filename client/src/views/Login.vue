<template>
  <div>
    <Navbar></Navbar>
    <div class="container p-5">
      <div class="card mx-auto mt-5 shadow" style="width: 25rem;">
        <div class="card-body text-left mx-auto">
          <lottie-player src="https://assets2.lottiefiles.com/datafiles/qUMDy7X7Pw2SttP/data.json"  background="#292B2C"  speed="1"  style="width: 350px; height: 350px;"  loop  autoplay></lottie-player>
          <form @submit.prevent="login">
            <div class="form-group mt-4">
              <input type="email" class="form-control" placeholder="Email" v-model="email" required>
              <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-dark">Login</button>
          </form>
          <!-- <button v-google-signin-button="clientId" class="btn btn-dark">Google</button> -->
          <a href="#" class="text-dark"><i id="google-icon" v-google-signin-button="clientId" class="fab fa-google mt-3"></i></a>Login
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'Login',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      email: '',
      password: '',
      clientId: '143146421319-p59q2kqecs5nk799gh4lsen519t5fphp.apps.googleusercontent.com'
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    },
    OnGoogleAuthSuccess (googleAccessToken) {
      console.log(googleAccessToken, 'google_access_token')
      // Receive the google_access_token and make your magic with the backend
      this.$store.dispatch('googleLogin', googleAccessToken)
    },
    OnGoogleAuthFail (error) {
      console.log(error, 'google sign in error')
    }
  }
}
</script>

<style scoped>
#google-icon {
  font-size: 1.75rem;
}
</style>
