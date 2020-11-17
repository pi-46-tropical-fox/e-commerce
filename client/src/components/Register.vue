<template>
<div>
  <Loading v-if="$store.state.loadingStatus"/>

  <div class="row">
      <div class="col-md-10 col-lg-8 mx-auto text-center">
          <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
          <h2 class="text-white mb-5">Register!</h2>
          <form class="form-inline d-flex" @submit.prevent ="register">
              <input  v-model="email"  class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" type="email" placeholder="Enter email address..." />
              <input   v-model="password"  class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" type="password" placeholder="Enter password..." />
              <button class="btn btn-primary mx-auto" type="submit">Submit</button>
          </form>
      </div>
  </div>
  <!-- <form @submit.prevent ="register"
        style="color:rgb(236 173 60);; font-weight: bold; font-size:1.2em;">
        <div class="form-group row">
            <label for="exampleInputEmail1" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <input type="email" v-model="email" class="form-control loginColumn" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
            <input type="password" v-model="password" class="loginColumn form-control" id="inputPassword">
            </div>
        </div>
        <div class="btn-group ml-5 mt-2">
            <button type="submit" class="btn btn-secondary" id="loginbtn">Register</button>
        </div>

    </form> -->

</div>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
  name: 'Register',
  components: {
    Loading
  },
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
      this.$store.dispatch('register', payload)
    }
  }
}
</script>

<style>

</style>
