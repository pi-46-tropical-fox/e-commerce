<template>
  <div class="home animate__animated animate__fadeIn">
    <h1>Welcome to our website</h1>
    <h3 v-if="$store.state.isLogin === false">You have to <router-link to="/login">Sign In</router-link> first to see our best collections</h3>
    <h3 v-else>You are login, click <router-link to="/product">Product</router-link> to see our best collections</h3>
    <img alt="brand logo" src="../assets/logo-sepatu-kw.png" style="border-radius: 20px; margin-top: 30px; height: 300px">
    <div class="container mt-4 d-flex justify-content-center">
      <div class="row mt-5 image-home">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQt8LkwfuaTg0v2KCH1C5qhk8TL4xSbfqaokA&usqp=CAU" alt="">
        <img src="https://cdns.klimg.com/newshub.id/news/2017/10/20/147675/657x328-bikin-logo-merek-ternama-nike-ternyata-cuma-dibayar-rp26-ribu-171020k.jpg" alt="">
        <img src="https://i0.wp.com/abyadscreenprinting.com/wp-content/uploads/2018/12/logo-puma.png?fit=362%2C353" alt="">
        <img src="https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png" alt="">
        <img src="https://img.pngio.com/logo-league-png-6-png-image-league-png-1600_597.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
<style>
  .image-home img {
    height: 80px;
    margin-right: 10px;
    margin-left: 10px;
    margin: 0 auto;
  }
  h1 {
    margin-top: 30px;
  }
  h3 {
    margin-top: 10px;
    margin-bottom: 30px;
  }
</style>
