<template>
  <v-container>
      <v-card class="mx-auto" max-width="600">
        <v-card-title class="d-flex align-start flex-column justify-center">
          <div class="text-xs-center">
            <!-- <img src="https://i.imgur.com/CazzVRS.png" height="40px" class="mb-3" alt> -->
            <span class="logo-login">mariope<span class="logo-login-lastchild">toko</span></span>
          </div>
          <v-flex class="mt-3">
            <p v-if="register" class="headline">Register</p>
            <p v-if="!register" class="headline">Log In</p>
          </v-flex>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-container grid-list-md>
            <form @submit.prevent="loginOrRegister">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field :rules="[rules.required]" label="Email*" required v-model="email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    hint="At least 8 characters"
                    label="Password*"
                    required
                    v-model="password">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn type="submit" v-if="register" flat class="accent--text">Register</v-btn>
                  <v-btn type="submit" v-if="!register" flat class="accent--text">Login</v-btn>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <a @click.prevent="register=true" v-if="!register">Don't have an account yet?</a>
                  <a @click.prevent="register=false" v-if="register">Login instead</a>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      register: false,
      email: '',
      password: '',
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    loginOrRegister () {
      if (this.register) {
        this.registerUser()
      } else {
        this.login()
      }
    },
    login () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          console.log('login vue')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    registerUser () {
      this.$store.dispatch('register', { email: this.email, password: this.password })
        .then(() => {
          console.log('register vue')
          this.$router.push('/login')
          // this.email = ''
          // this.password = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
.logo-login {
  font-family: 'Baumans', cursive;
  font-size: 3rem;
  padding-left: 10rem;
  letter-spacing: 0.001em;
}
.logo-login-lastchild {
  color: #E31E52;
}
</style>
