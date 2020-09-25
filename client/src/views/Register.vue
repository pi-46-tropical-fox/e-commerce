<template>
  <div class="container mt-3">
    <div class="row ">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Register</h1><hr>
            <form @submit.prevent="register">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Username :</label>
                <div class="col-sm-9">
                  <input v-model="username" type="text" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Email :</label>
                <div class="col-sm-9">
                  <input v-model="email" type="email" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Password :</label>
                <div class="col-sm-9">
                  <input v-model="password" type="password" class="form-control">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-5 ml-auto">
                  <input type="submit" class="form-control btn btn-success" value="Register">
                </div>
              </div>
            </form>
          </div>
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
      username: null,
      email: null,
      password: null
    }
  },
  methods: {
    register () {
      return this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.getItem('access_token')) {
      return next()
    }
    return next('/')
  }
}
</script>
