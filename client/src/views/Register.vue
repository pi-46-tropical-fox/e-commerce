<template>
  <div>
    <Navbar></Navbar>
    <div class="container p-5">
      <div class="card mx-auto mt-5 shadow" style="width: 25rem;">
        <div class="card-body text-left mx-auto">
          <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_quA8Dc.json"  background="#292B2C"  speed="1"  style="width: 350px; height: 300px;"  loop  autoplay></lottie-player>
          <form @submit.prevent="register">
            <div class="form-group mt-4">
              <input type="text" class="form-control" placeholder="Username" v-model="username" required>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email" v-model="email" required>
              <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-dark">Register</button>
          </form>
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
  name: 'Register',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
      this.username = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
