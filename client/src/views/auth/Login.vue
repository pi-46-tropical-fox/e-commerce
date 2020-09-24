<template>
  <div class="container md-elevation-2">
    <form @submit.prevent="login">
      <img src="../../assets/logo.png" alt="" class="image" />
      <div v-for="(err, i) in error" :key="i">
        <p class="err-message">{{ err }}</p>
      </div>
      <md-field>
        <label>Email</label>
        <md-input v-model="email" placeholder="Enter Your Email"></md-input>
      </md-field>

      <md-field>
        <label>Password</label>
        <md-input
          v-model="password"
          type="password"
          placeholder="Enter Your Password"
        ></md-input>
      </md-field>

      <md-button type="submit" class="md-raised">Login</md-button>
      <p>
        Already Have An Account?
        <router-link to="/register">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: [],
      submitStatus: null,
    };
  },
  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const payload = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("login", payload)
          .then((res) => {
            this.$swal.fire({
              icon: "success",
              title: res.data.message,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            this.$router.push("/");
          })
          .catch((err) => {
            this.error = err.response.data.errors;
            setTimeout(() => (this.error = []), 6000);
          });
      }
    },
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
};
</script>

<style>
.container {
  width: 35em;
  margin: 0 auto;
  margin-top: 10em;
  padding: 4em;
}

.image {
  margin-bottom: 2em;
}

.err-message {
  color:red;
}
</style>
