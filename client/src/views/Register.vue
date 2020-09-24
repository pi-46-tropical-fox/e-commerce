<template>
  <div class="register-page">
    <!-- <div class="image-show">
      <img src="..\assets\logo.jpg" alt="">
    </div> -->
    <div class="register-container">
      <h1>Register</h1>
      <p v-for="(alert, index) in registerAlert" :key='index'>{{alert}}</p>
      <form action="">
        <label for="">Email</label>
        <!-- <br> -->
        <input type="text" v-model='email'>
        <br>
        <label for="">Password</label>
        <!-- <br> -->
        <input type="password" v-model='password'>
        <br>
        <label for="">Name</label>
        <!-- <br> -->
        <input type="text" v-model='name'>
        <br>
        <label for="">Address</label>
        <!-- <br> -->
        <textarea cols="23" rows="5"></textarea>
        <br>
        <label for="">Phone</label>
        <!-- <br> -->
        <p v-show="!isPhoneValid">Please insert number only</p>
        <input type="text" v-model='phone'>
        <br><br>

        <button class="btn btn-secondary" @click.prevent='register'>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      address: '',
      phone: '',
      isPhoneValid: true
    }
  },
  methods: {
    register () {
      const payload = {
        email: this.email,
        password: this.password,
        name: this.name,
        address: this.address,
        phone: this.phone
      }
      if (this.isPhoneValid) {
        this.$store.dispatch('register', payload)
          .then((isSuccess) => {
            if (isSuccess) {
              this.email = ''
              this.password = ''
              this.name = ''
              this.address = ''
              this.phone = ''
              this.isPhoneValid = true
              swal('Registration complete press OK to login.')
                .then((value) => {
                  this.$router.push('/login')
                })
            }
          })
      } else {
        this.$store.commit('SET_REGISTER_ALERT', ['Please insert phone number'])
      }
    }
  },
  computed: {
    registerAlert () {
      return this.$store.state.registerAlert
    }
  },
  watch: {
    phone: function () {
      // let isValid = this.phone.match(/^[0-9]$/)
      const isValid = /^[0-9]+$/.test(this.phone)
      if (isValid) {
        this.isPhoneValid = true
      } else {
        this.isPhoneValid = false
      }
      console.log(this.isPhoneValid)
    }
  }
}
</script>

<style>

</style>
