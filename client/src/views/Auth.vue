<template>
  <div class="auth-page">
    <div class="container-auth">
      <div class="auth">
          <button
            class="btn-left "
            style="padding-right: 50px;padding-left: 50px;border-radius: 0;background-color: blanchedalmond;"
            @click="toggle"
          >
            Register
          </button>
          <button
            class="btn-right"
            style="padding-right: 50px;padding-left: 50px;border-radius: 0;background-color: blanchedalmond;"
            @click="toggle"
          >
            Sign In
          </button>
        <Login :status="status"></Login>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../components/login";

export default {
  name: "Auth",
  data() {
    return {
      status: false,
    };
  },
  components: {
    Login,
  },
  methods: {
    toggle() {
      this.status = !this.status;
    },
  },
};
</script>

<style>
/* *{
    background-color: grey ;
  } */

/* *{
    background-image: url('../../public/691819.jpg') ;
  } */
.container-auth {
  background: inherit;
  display: flex;
  justify-content: center;
}

.auth-page {
  background-image: url("../../public/691819.jpg");
  height: 100vh;
}

.auth{
  margin-top:15% ;
}

</style>
