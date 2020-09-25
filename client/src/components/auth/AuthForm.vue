<template>
  <div class="card">
    <div class="tab-wrapper">
      <a href="#" @click.prevent="setCurrentTab('login')">
        <span
          class="tab"
          :class="currentTab === 'login' ? 'active' : ''"
          id="login-tab"
          >Login</span
        >
      </a>
      <a href="#" @click.prevent="setCurrentTab('register')">
        <span
          class="tab"
          :class="currentTab === 'register' ? 'active' : ''"
          id="register-tab"
          >Register</span
        >
      </a>
    </div>

    <div class="wrapper">
      <!-- LoginForm -->
      <LoginForm v-if="currentTab === 'login'" @login="login" />
      <!-- RegisterForm -->
      <RegisterForm
        @setCurrentTab="setCurrentTab"
        @register="register"
        v-else-if="currentTab === 'register'"
      />
    </div>

    <!-- GoogleLogin -->
    <GoogleLogin v-if="currentTab === 'login'" @gLogin="gLogin" />
  </div>
</template>

<script>
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GoogleLogin from "./GoogleLogin";

import axios from "@/config/axios";
import swal from "@/config/swal";

export default {
  components: {
    LoginForm,
    RegisterForm,
    GoogleLogin,
  },

  data() {
    return {
      currentTab: "login",
    };
  },

  methods: {
    setCurrentTab(payload) {
      this.currentTab = payload;
    },

    isActive(name) {
      return this.currentTab === name;
    },

    login(input) {
      axios({
        url: "/auth/login",
        method: "POST",
        data: input,
      })
        .then(({ data }) => {
          this.$store.dispatch("login", data);

          this.$router.push({ name: "Home" });

            swal.showToastSuccess(`Hi there, ${data.name}!`);
        })
        .catch(({ response }) => {
          swal.showSwalError(response.data.join("<br>"));
        });
    },

    gLogin(googleUser) {
      if (!localStorage.access_token) {
        const g_access_token = googleUser.getAuthResponse().id_token;

        axios({
          url: "/auth/login/g",
          method: "POST",
          headers: {
            g_access_token,
          },
        })
          .then(({ data }) => {
            this.$store.dispatch("login", data);

            this.$router.push({ name: "Home" });

            swal.showToastSuccess(`Hi there, ${data.name}!`);
          })
          .catch(({response}) => {
            swal.showSwalError(response.data.join("<br>"));
          });
      }
    },

    gLoginError(e) {
      swal.showSwalError(e);
    },

    register(input) {
      axios({
        url: "/users/register",
        method: "POST",
        data: input,
      })
        .then(({ data }) => {
          swal.showToastSuccess(data.message);

          this.setCurrentTab("login");
        })
        .catch(({ response }) => {
          swal.showSwalError(response.data.join("<br>"));
        });
    },
  },
};
</script>

<style>
</style>