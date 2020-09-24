<template>
    <div class="form-container">
        <form @submit.prevent="register">
            <div class="tabs">
              <ul>
                <li @click.prevent="$router.push({name: 'Login'})"><a>Login</a></li>
                <li class="is-active"><a>Register</a></li>
              </ul>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" v-model="email">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="password">
                </div>
            </div>
            <button class="button" type="submit">Register</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', data)
        .then(({ data }) => {
          this.$router.push({ name: 'Login' })
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>

<style>

</style>
