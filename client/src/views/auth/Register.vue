<template>
  <div class="container md-elevation-2">
    <img src="../../assets/logo.png" alt="" class="image" />
    <form @submit.prevent="register">
      <div v-for="(err, i) in error" :key="i">
        <p class="err-message">{{ err }}</p>
      </div>
      <md-field>
        <label>Email</label>
        <md-input
          v-model.trim="$v.email.$model"
          type="email"
          placeholder="Enter Your Email"
        ></md-input>
        <span class="md-error" v-if="!$v.email.required">The Email is required</span>
      </md-field>
      <!-- <p v-if="!$v.email.required">Please Fill In The Email</p> -->

      <md-field>
        <label>Password</label>
        <md-input
          v-model.trim="$v.password.$model"
          type="password"
          placeholder="Enter Your Password"
        ></md-input>
      </md-field>
      <!-- <p v-if="!$v.password.required">Please Fill In The Password</p> -->
      
      <md-button type="submit" class="md-raised">Register</md-button>
    </form>
    <p>
      Dont't Have An Account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      error: [],
      submitStatus: null,
    };
  },
  methods: {
    register() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const payload = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("register", payload)
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
            this.$router.push("/login");
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
      required
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
  color: red;
}
</style>
