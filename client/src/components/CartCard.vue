<template>
  <div class="card mb-3 mt-3 mr-2 ml-2 pt-1 pb-1 pl-1 pr-1 shadow-sm">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="cartsData.Product.image" class="card-img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title">{{ cartsData.Product.name }}</h4>
              <div class="row text-left">
                <h6>{{ cartsData.Product.description }} </h6>
                </div>
                <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
                  <h5>Specification</h5>
                </div>
              <div class="row text-left">
              <p>Gender: {{ cartsData.Product.gender }} <br>
              Category: {{ cartsData.Product.category }} <br>
                Dimension: {{ cartsData.Product.diameter }} <br>
              Movement: {{ cartsData.Product.movement }} <br>
              </p>
            </div>
             <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
               <div class="col text-left">
                  <h6>Price Rp. {{ priceLocale }}</h6>
                  </div>
                  <div class="col text-right">
                  <small>Quantity {{ cartsData.quantity }}</small>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cartsData'],
  computed: {
    priceLocale () {
      return this.cartsData.Product.price.toLocaleString('id-ID')
    }
  }
}
</script>

<style>

</style>
