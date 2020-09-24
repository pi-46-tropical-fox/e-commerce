<template>
  <div id="register">
    <form action id="registerForm" @submit.prevent="register">
      <div class="content">
        <div class="form-group">
          <input type="text" v-model="name" placeholder="Your full name" />
        </div>
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="confirm_password"
            placeholder="Confirm password"
          />
        </div>
      </div>
      <div class="footer">
        <div class="form-group text-center">
          <input type="submit" class="btn info" value="Register" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from "@/config/swal.js";

export default {
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  },

  methods: {
    async register() {
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      if (this.password === this.confirm_password) {
        this.name = "";
        this.email = "";
        this.password = "";
        this.confirm_password = "";

        await this.$store.dispatch("register", payload);

        if(this.registrationStatus){
          this.$emit('setCurrentTab', 'login')
        }
      } else {
        swal.showToastError('Your password confirmation does not match with your password.')
      }
    },
  },

  computed: {
    registrationStatus() {
      return this.$store.state.registrationIsSuccessful;
    },
  },
};
</script>

<style>
</style>