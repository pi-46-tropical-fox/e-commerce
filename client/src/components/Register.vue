<template>
<div class="">
  <Navbar></Navbar>
  <div class="container">
    <div class="login-wrapper">
    <!-- <img src="../assets/123jg.jpeg" id="bg-img" alt=""> -->
    <div class="login-box">
      <h1>Register Here</h1>
      <form @submit.prevent="doRegister">
        <p>Name</p>
        <input type="text" name="text" v-model="form.name"
        placeholder="Enter Name" required>

        <p>Email</p>
        <input type="email" name="email" v-model="form.email"
        placeholder="Enter Email" required>

        <p>Password</p>
        <input type="password" name="password" v-model="form.password"
        placeholder="Enter Password" required>

        <input type="submit" name="submit" value="Register">
        <h6>Already have account? Please <a id="sign-up" href="" @click.prevent="redirectToSignIn">sign in</a> here</h6>
          <!-- <a href="#"
        id="sign-up">Sign Up</a></h6> -->
      </form>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
// import axios from "../config/axios"
import Navbar from '../components/Navbar'
export default {
  name: 'LoginPage',
  components: {
    Navbar
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    doRegister () {
      const registerForm = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      // console.log(loginForm)
      this.$store.dispatch('register', registerForm)
    },
    redirectToSignIn () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.container
{
  font-family: 'Roboto Slab', serif;
}

#bg-img
{
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  max-height: 100%;
  /* min-height: 50%; */
  /* background-size: cover; */
}

.login-box
{
  width: 300px;
  height: 420px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%,-50%);
  box-sizing: border-box;
  padding: 40px 40px;
}

.login-wrapper {
  width: 377px;
  height: 500px;
  /* display: flex; */
  /* margin: 25%; */
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%,-50%);
  box-sizing: border-box;
  box-shadow: 0 0 19px 5px rgba(5, 27, 73, 0.19);
  background-color: #f3efeb;
  /* rgba(85, 239, 196,1.0) */
  /* display: grid; */
}

h1
{
  margin: 0;
  padding: 0 0 20px;
  text-align: center;
  font-size: 20px;
}

h6
{
  margin: 0;
  padding: 0 0 20px;
  /* text-align: center; */
  font-size: 11px;
}

.login-box p
{
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-size: 14px;
}

.login-box input
{
  width: 100%;
  margin-bottom: 20px;
}

.login-box input[type="text"], input[type="email"], input[type="password"]
{
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  height: 40px;
  color: #fff;
  font-size: 12px;
}

.login-box input[type="submit"]
{
  border: none;
  outline: none;
  height: 35px;
  background: #2ecc71;
  color: #fff;
  font-size: 15px;
  border-radius: 20px;
}

.login-box input[type="submit"]:hover
{
  cursor: pointer;
  color: #fff;
  background: #29b463;
  /* background: #39dc79; */
}

.login-box a
{
  text-decoration: none;
  font-size: 14px;
  color: #fff;
}

.login-box a:hover
{
  /* color: #39dc79; */
  color: gainsboro;
}

#sign-up {
  font-size: 11px;
}

#sign-up:hover {
  color: #1dee74;
}

</style>
