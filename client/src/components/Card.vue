<template>
  <div class="card mb-3 mt-3 mr-2 ml-2 pt-1 pb-1 pl-1 pr-1 shadow-sm">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="productsData.image" class="card-img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title">{{ productsData.name }}</h4>
              <div class="row text-left">
                <h6>{{ productsData.description }} </h6>
                </div>
                <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
                  <h5>Specification</h5>
                </div>
              <div class="row text-left">
              <p>Gender: {{ productsData.gender }} <br>
              Category: {{ productsData.category }} <br>
                Dimension: {{ productsData.diameter }} <br>
              Movement: {{ productsData.movement }} <br>
              </p>
            </div>
             <div class="row border justify-content-center text-warning" style="background-color:  #2c3e50; color: #ffb142">
               <div class="col text-left">
                  <h6>Price Rp. {{ priceLocale }}</h6>
                  </div>
                  <div class="col text-right">
                  <small>Stock {{ productsData.stock }}</small>
                  </div>
                </div>
                <div class="row">
                <button class="btn btn-sm btn-dark text-white mr-2" type="submit">Add To Favorites</button>
                <button class="btn btn-sm btn-dark text-white" type="submit"  @click="addToCart(productsData.id)">Add To Cart</button>
                </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {
      quantity: 0
    }
  },
  props: ['productsData'],
  methods: {
    async addToCart (id) {
      const { value: quantity } = await this.$swal.fire({
        title: `How many ${this.productsData.name} do you want?`,
        icon: 'question',
        input: 'range',
        inputAttributes: {
          min: 1,
          max: this.productsData.stock,
          step: 1
        },
        inputValue: 1
      })
      const payload = {
        ProductId: id,
        quantity
      }
      console.log(payload, 'ini payload addtocart yang dilempar dari card ke vuex')
      this.$store.dispatch('addToCart', payload)
    }
  },
  computed: {
    priceLocale () {
      return this.productsData.price.toLocaleString('id-ID')
    }
  }
}
</script>

<style>

</style>
