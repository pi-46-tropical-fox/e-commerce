<template>
<div>
  <Loading v-if="$store.state.loadingStatus"/>
   <form @submit.prevent ="login"
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
            <button type="submit" class="btn btn-secondary" id="loginbtn">Login</button>
        </div>

    </form>

</div>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
  name: 'Login',
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
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    }
  }

}
</script>

<style>

</style>
