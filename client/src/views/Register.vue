<template>
  <div class="sign-up">
      <div class="container container-fluid col-sm-4 p-4">
          <div class="row-3 p-5 border border-secondary" style="border-radius: 20px; box-shadow: 0 0 10px grey, 0 0 3px grey">
          <form @submit.prevent="register">
              <span style="font-size: 30px">Register</span><br>
              <div class="form-group">
                  <label for="name" class="col-form-label"></label>
              <div>
                  <input type="text" class="form-control" v-model="name" placeholder="Name" required>
              </div>
              </div>
              <div class="form-group">
                  <label for="email" class="col-form-label"></label>
              <div>
                  <input type="email" class="form-control" v-model="email" placeholder="Email" required>
              </div>
              </div>
              <div class="form-group">
                  <label for="password" class="col-form-label"></label>
              <div>
                  <input type="password" class="form-control" v-model="password" placeholder="Password" required>
              </div>
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
          </form>
          <div style="text-align: center;margin-top: 2em;">
              <p class="text-center">
                Already have a acoount
                <router-link :to="{path: '/login'}">Login</router-link>
              </p>
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
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('registerSubmit', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>

</style>
