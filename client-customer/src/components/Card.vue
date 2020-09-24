<template>
    <div class="card mx-3 p-3" :class="{'unavailable': stock == 'Currently unavailable'}" style="width: 18rem" id="home-card">
      <img :src="product.imageURL" class="card-img-top card-image p-3" alt="...">
      <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <hr>
          <p class="card-text">{{currencyFormat}}</p>
          <p class="card-text" v-if="stock > 1">Available Stock: {{stock}}</p>
          <p class="card-text"  style="color: tomato" v-else-if="stock == 1">Only {{stock}} stock left!</p>
          <p class="card-text" v-else>{{stock}}</p>

      </div>
          <div class="product-footer  ml-auto">
          Add To Cart<i class="delete-product fas fa-cart-plus ml-2" @click="addToCart(product.id)" v-if="stock"></i>
          </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  data: function () {
    return  {
      id: this.product.id,
      item: this.product,
      stock: this.product.stock || 'Currently unavailable'
    }
  },
  components: {
  },
  methods: {
    addToCart (id) {
      if(this.stock == 'Currently unavailable') {
      alertify.error('Cant add item to cart')
      } else {
      this.$store.dispatch('addToCart', id)
       alertify.success('Item has been added to cart')
      console.log(this.stock)
      }

    },
    goToDetail(id) {
      this.$router.push(`/product/${id}`)
    }
  },
  computed: {
    currencyFormat () {
      console.log(this.id)
      const output = `Rp${new Intl.NumberFormat().format(this.product.price)},00`
      return output
    }
  }
}
</script>

<style>
i{
  cursor: pointer;
}
#home-card {
  color: antiquewhite;
  border-radius: 39px;
  background: #01579b;
  box-shadow:  -3px -3px 10px #012e52, 3px 3px 10px #0180e4;
  }
.unavailable {
  opacity: .4;
}

</style>
