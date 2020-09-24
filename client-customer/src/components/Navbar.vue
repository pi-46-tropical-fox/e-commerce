<template>
  <div >
    <nav class="navbar navbar-expand-lg" id="navigation">
      <a class="navbar-brand" id="brand" @click="goHome">BENZO</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <h6 class="nav-link home-btn" @click="goHome">Home</h6>
          </li>
          <li class="nav-item">
              <h6 class="nav-link" @click="goToElectronics">Electronics</h6>
          </li>
          <li class="nav-item">
              <h6 class="nav-link" @click="goToSportingGoods">Sporting Goods</h6>
          </li>

        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <i @click="goCheckout" class="fas fa-shopping-cart my-auto fa-2x"></i>
          </li>
          <li class="nav-item">
            <i class="fas fa-sign-out-alt fa-2x ml-5" @click="logout"></i>
          </li>
        </ul>
      </div>
    </nav>
    <div class="add-form">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    goToElectronics () {
      this.$router.push('/category/electronics')
    },
    goToSportingGoods () {
      this.$router.push('/category/sportinggoods')
    },
    goHome () {
      this.$router.push('/home')
    },
    goCheckout () {
      this.$router.push('/checkout')
    }
     }

}
</script>

<style>
@keyframes bannerGradient {
  0%{background-position:28% 0%}
  50%{background-position:73% 100%}
  100%{background-position:28% 0%}
}
#navigation {
  align-items: center;
  border-radius: 6px;
  border-radius: 3px;
  border-radius: 3px;
  background: #01579b;
  box-shadow:  -5px 5px 10px #013e6e, 5px -5px 10px #0170c8;
   background: linear-gradient(211deg, #419ade, #1e4376);
  background-size: 400% 400%;
  animation: bannerGradient 2s ease infinite;
}
#brand {
  cursor: pointer;
    z-index: 100;
    font-family: 'Fredoka One', cursive;
    font-size: 3rem;
    color: #FAEBD7;
    text-shadow:  -2px -2px 10px #b9ae9f, 2px 2px 10px #ffffff;
}
h6,i {
  cursor: pointer;
  transition: .3s;
}
h6:hover,i:hover {
  color: #FAEBD7;
}
</style>
