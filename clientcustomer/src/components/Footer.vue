<template>
  <div class="jumbotron" id="jumbo" style="margin-top:100px;">

    <b-row class="text-center">
        <b-col>
          <img src="https://img.icons8.com/clouds/2x/t-shirt.png" class="logo-footer" style="height: 120px; border-radius: 3%;">
        </b-col>
        <b-col cols="4">
          <div class="location">
              <h4>Contact Us</h4>
              <p>Jl. Kebayoran Lama No. 87, Jakarta, <br>Daerah Khusus Ibukota Jakarta 10350</p>
          </div>
        </b-col>
        <b-col class="align-middle mt-3">
        <h1 style="color:whitesmoke;" class="">Gudang Kaos</h1>
        <small style="color:whitesmoke;" class="">Jakarta</small><br>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  computed: {
    getCategories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style>
.jumbotron {
  bottom : 0px;
  width: 100%;
  color: white;
}
#jumbo {
  margin: 0;
  background-color: rgb(7, 97, 133);
  border-radius: 0%;
}
</style>
