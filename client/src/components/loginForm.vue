<template>
<div>
  <div class="container d-flex justify-content-center">
          <h3>Welcome Back!</h3>
      </div>
      <form @submit.prevent="loginPost">
        <div class="container" id="form" style="background:#fff">
          <div class="form-group">
          <label for="exampleInputEmail1">Email address :</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
            placeholder="email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password :</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
            placeholder="*****"
          />
        </div>

        </div>
        <div class="container d-flex justify-content-center" style="width:100%">
        <button type="submit" class="btn">Login</button>
        </div>
      </form>
      </div>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginPost () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:ital,wght@1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');

h1{
  font-family: 'Abril Fatface', cursive;
  font-size: 50px;
  color: black;
  padding-top: 20px;
}
label{
font-family: 'Oswald', sans-serif;
font-family: 'Poppins', sans-serif
}
.btn{
  color: black;
  padding-left: 100px;
  padding-right: 100px;
  background-color: #8fc0a9;
  border-radius: 0;
  font-family: 'Abril Fatface', cursive;
  font-size: large;
}
.btn:hover{
  color: #fff;
  background-color: #1b262c;
}

</style>
