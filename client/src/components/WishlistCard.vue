<template>
  <div class="card mb-3 mt-3 mr-2 ml-2 pt-1 pb-1 pl-1 pr-1 shadow-sm">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="wlData.Product.image" class="card-img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title">{{ wlData.Product.name }}</h4>
              <div class="row text-left">
                <h6>{{ wlData.Product.description }} </h6>
                </div>
                <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
                  <h5>Specification</h5>
                </div>
              <div class="row text-left">
              <p>Gender: {{ wlData.Product.gender }} <br>
              Category: {{ wlData.Product.category }} <br>
                Dimension: {{ wlData.Product.diameter }} <br>
              Movement: {{ wlData.Product.movement }} <br>
              </p>
            </div>
             <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
               <div class="col text-left">
                  <h6>Price Rp. {{ priceLocale }}</h6>
                  </div>
                  <div class="col text-right">
                  <small>Stock {{ wlData.Product.stock }}</small>
                  </div>
                </div>
                <div class="row">
                <button class="btn btn-sm btn-dark text-white mr-2" type="submit" @click="removeFromWishlist(wlData.id)">Remove From Wishlist</button>
                </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'WishlistCard',
  props: ['wlData'],
  methods: {
    removeFromWishlist (id) {
      this.$store.dispatch('removeFromWishlist', id)
    }
  },
  computed: {
    priceLocale () {
      return this.wlData.Product.price.toLocaleString('id-ID')
    }
  }

}
</script>

<style>

</style>
