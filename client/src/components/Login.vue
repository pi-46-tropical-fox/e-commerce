<template>
  <div role="tabpanel" class="tab-pane active form-are" id="login">
    <form @submit.prevent="loginSubmit">
      <div class="form-bor">
        <div class="form-input-group">
          <label for="">Email</label>
          <input type="text" name="email" v-model="email" />
        </div>

        <div class="form-input-group">
          <label for="">Password</label>
          <input type="password" name="password" v-model="password" />
        </div>
        <div class="form-input-group">
          <button>Sign in</button>
        </div>
        <div class="form-input-group">
          <button @click.prevent="goToHome"><i class="fas fa-shopping-bag"></i> Continue Shopping?</button>
        </div>
      </div>
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
    loginSubmit () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginSubmit', payload)
    },
    goToHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style></style>
