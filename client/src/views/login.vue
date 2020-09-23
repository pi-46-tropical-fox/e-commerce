<template>
<div class="container d-flex justify-content-center align-items-center" style="height:100vh">
    <div class="container col-6">
      <h1 style="text-align:center;font-weght:bolder;" class="mb-3">foxShop</h1>
      <div class="container d-flex justify-content-center mb-4" id="button">
      <button class="btn"
            @click="register"
          style="
            padding-right: 85px;
            padding-left: 85px;
            border-radius: 0;
            background-color: #8fc0a9;
          ">Register</button>
      <button class="btn"
            @click="login"
          style="
            padding-right: 85px;
            padding-left: 85px;
            border-radius: 0;
            background-color: #8fc0a9;
          ">Sign in</button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    register () {
      this.$router.push({ name: 'registerForm' })
    },
    login () {
      this.$router.push({ name: 'loginForm' })
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
