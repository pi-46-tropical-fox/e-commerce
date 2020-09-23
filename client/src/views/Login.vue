<template>
  <div>
    <section id="login-page">
      <div class="login-page-left">
        <img src="../assets/logo.png" alt="login page" />
      </div>
      <div class="login-page-right">
        <h1>Sign In</h1>
        <form @submit.prevent="login()">
          <label>Email</label>
          <input type="email" v-model="email" id="login-email" />
          <label>Password</label>
          <input type="password" v-model="password" id="login-password" required />
          <button class="login-btn" type="submit">Login</button> <br>
          <br>
          <p>
            Don't have an id?
            <a @click="toRegisterPage">Sign up here</a>
          </p>
        </form>
      </div>
    </section>
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
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.$router.push({ name: 'Home' })
    },
    toRegisterPage () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style>
#login-page {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    overflow: hidden;
}

.login-page-left {
    width: 60%;
    background-color: #020202;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.login-page-left img {
    width: 60%;
    z-index: 999;
}

.login-page-right {
    width: 40%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-page-right h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.login-page-right form {
    display: flex;
    width: 90%;
    flex-direction: column;
    z-index: 99;
}

.login-page-right input {
    margin: 1rem 0;
    height: 30px;
}

.login-btn {
    background-color: #0D3B66;
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 0;
}
</style>
