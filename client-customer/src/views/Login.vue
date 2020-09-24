<template>
  <div class="login-container">
      <header class="header mx-auto">
          <h1 class="header-item">BENZO</h1>
      </header>
      <div class="banner">
        <lottie-player class=" my-auto" src="https://assets8.lottiefiles.com/packages/lf20_0ny14efc.json" mode="bounce" background="transparent"  speed="1"  style="width: 800px; height: 800px;"  loop  autoplay></lottie-player>
      </div>
      <div class="login mx-aut0">

          <h1 class="mx-auto d-inline login-register" :class="{'is-active': status }" @click="toggle">LOGIN</h1><h1 class="login-register mx-auto d-inline"  :class="{'is-active': !status }" @click="toggle"> REGISTER</h1>
          <LoginForm
          :status="status"
          class="login-component mx-auto"
          ></LoginForm>
      </div>
      <div class="footer">
        <marquee behavior="scroll" direction="left" scrollamount="11"><i class="fas fa-tshirt fa-3x"></i></marquee>
        <marquee behavior="scroll" direction="right" scrollamount="7"><i class="fas fa-basketball-ball fa-3x"></i></marquee>
        <marquee behavior="scroll" direction="left" scrollamount="10"><i class="fas fa-laptop fa-3x"></i></marquee>
        <marquee behavior="scroll" direction="right" scrollamount="5"><i class="fas fa-mobile fa-3x"></i></marquee>
      </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      status: true
    }
  },
  methods: {
    toggle (event) {
      event.target.classList.toggle('is-active')
      this.status = !this.status
    }
  }

}
</script>

<style>

.login-container {
    box-sizing: border-box;
    display: grid;
    grid-template-areas:
    'header header'
    'login login'
    'footer footer';
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 1fr 10fr 1fr;
    height: 100%;
    width: 100vw;
    gap: 10px;
}
.login-component{
    margin: 10px;
    height: 40%;
    width: 100%;
}
.login-register{
font-family: 'Fredoka One', cursive;
  text-shadow:  -1px -1px 2px #221f1a, 1px 1px 2px #211d1d;
}
header{
    padding: 20px;
    grid-area: header;
}
.header-item {
    display: inline;
}
h1.header-item {
    z-index: 100;
    font-family: 'Fredoka One', cursive;
    font-size: 7rem;
    color: #FAEBD7;
    text-shadow:  -2px -2px 10px #b9ae9f, 2px 2px 10px #ffffff;
}

.banner {
    grid-area: banner;
    display: none;
    border-radius: 30px;
    box-shadow:  5px 5px 10px #014a84, -5px -5px 10px #0164b2;
}

h1 {
    cursor: pointer;
}

.login {
    grid-area: login;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.is-active {
    z-index: 100;
    font-family: 'Fredoka One', cursive;
    color: #FAEBD7;
    text-shadow:  -1px -1px 5px #b9ae9f, 1px 1px 5px #ffffff;

}
footer{
    font-size: 5rem;
    grid-area:  footer;
    border-radius: 22px;
    box-shadow:  5px 5px 10px #014a84, -5px -5px 10px #0164b2;
}
marquee {
   grid-area: footer;
}

@media screen and (min-width: 576px) {
    .login-container {
    box-sizing: border-box;
    display: grid;
    grid-template-areas:
    'header header'
    'banner login'
    'footer footer';
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 1fr 10fr 1fr;
    height: 100vh;
    width: 90vw;
    gap: 5px;
    margin: auto;

    }
    .banner {
    grid-area: banner;
    display: flex;
    justify-content: center;
    align-items: center;
    }
}

</style>
