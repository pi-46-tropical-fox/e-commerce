<template>
    <div class="form-container">
        <form @submit.prevent="login">
            <div class="tabs">
              <ul>
                <li class="is-active"><a>Login</a></li>
                <li @click.prevent="$router.push({name: 'Register'})"><a>Register</a></li>
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
            <button class="button" type="submit">Login</button>
        </form>
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
      this.$store.dispatch('login', data)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$router.push({ name: 'Home' })
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>

<style>

</style>
