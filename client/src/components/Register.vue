<template>
   <div role="tabpanel" class="tab-pane active form-are" id="profile">
    <form @submit.prevent="registerSubmit">
        <div class="form-input-group">
          <label for="">Email</label>
          <input type="text" name="email" v-model="email"/>
        </div>

        <div class="form-input-group">
          <label for="">Password</label>
          <input type="password" name="password" v-model="password"/>
        </div>
        <div class="form-input-group">
          <button>Sign Up</button>
        </div>
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
    registerSubmit () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('registerSubmit', payload)
    }
  }
}
</script>

<style></style>
