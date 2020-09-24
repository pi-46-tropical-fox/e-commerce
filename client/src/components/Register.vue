<template>
  <div class="fst-container d-flex justify-content-center align-items-center">
        <div class="scd-container container d-flex justify-content-center align-items-center">
            <div class="trd-container">
                <div class="img-container">
                    <img class="card-img-top" src="/assets/register.jpg" alt="Card image cap">
                </div>
                <div class="body-container card-body">

                </div>
                <div class="form-container container pt-3 pb-3">
                    <h4 class="login-text">REGISTER</h4>
                    <form @submit.prevent="register">
                        <div class="form-group">
                          <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                          <input type="password" class="form-control" v-model="password" placeholder="Password">
                        </div>
                        <button type="submit" class="btn login-btn">Login</button>
                        <p style="color: #fff">Already have account? <router-link style="color: #fff" class="btn" :to="{name: 'Login'}">Click here</router-link></p>
                      </form>
                </div>
            </div>
        </div>
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
    register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    }
  }
}
</script>

<style scoped>
.fst-container{
  width: 100vw; height: 100vh;
  background-image: linear-gradient(to left, #a32020, #8b123c, #602883);
}

.trd-container{
  border: 1px solid black;
  border-radius: 5px;
  min-height: 500px;
  width: 500px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
}

.img-container{
  height: 50%;
}

.body-container{
  height: 50%;
}

.form-container{
  position: relative;
  z-index: 99;
  margin-top: -70px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
  width: 450px;
  border-radius: 5px;
}

.login-text{
  text-align: center;
  color: white;
}

.login-btn{
  background-color: #fff; color: #602883;
}
</style>
