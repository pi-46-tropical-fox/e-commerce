<template>
  <section id="register-page">
    <div class="register-page-left">
        <img src="../assets/logo.png" alt="register page">
    </div>
    <div class="register-page-right">
        <h1>Sign Up</h1>
        <form @submit.prevent="register()">
            <label>Email</label>
            <input type="email"  v-model="email" id="register-email" required>
            <label>Password</label>
            <input type="password"  v-model="password" id="register-password" required>
            <button class="register-btn" type="submit">Register</button><br>
            <p>Already have an id? <a href="" @click="moveToLogin">Sign in here</a></p>
        </form>
    </div>
</section>
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
    moveToLogin () {
      this.$router.push({ name: 'Login' })
    },
    register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
#register-page {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    overflow: hidden;
}

.register-page-left {
    width: 60%;
    background-color: #020202;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.register-page-left img {
    width: 60%;
    z-index: 999;
}

.register-page-right {
    width: 40%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.register-page-right h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.register-page-right form {
    display: flex;
    width: 90%;
    flex-direction: column;
    z-index: 99;
}

.register-page-right input {
    margin: 1rem 0;
    height: 30px;
}

.register-btn {
    background-color: #0D3B66;
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 0;
}
</style>
