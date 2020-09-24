<template>
  <div class="container-login">
    <div class="container d-flex justify-content-center mt-3">
      <h3 style="color: #fff;">Welcome Back!</h3>
    </div>
    <div class="container d-flex justify-content-center text-align-center">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="exampleInputEmail1" style="color: #fff;"
            >Email address</label
          ><br />
          <input
            type="email"
            class="form-control"
            v-model="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
          /><br />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" style="color: #fff;"
            >Password</label
          ><br />
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="exampleInputPassword1"
            placeholder="******"
          /><br />
        </div>
        <div class="d-flex justify-content-center mb-3">
          <button
            type="submit"
            class="btn"
            style="background: blanchedalmond;padding-right: 50px;padding-left: 50px;border-radius: 0;"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["status"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      if (this.status) {
        this.$store.dispatch('login', payload);
        this.$router.push('/')
      }else{
          this.$store.dispatch('register', payload)
      }
    },
  },
};
</script>

<style scoped>
.container-login{
  background-color: black;
}

</style>
