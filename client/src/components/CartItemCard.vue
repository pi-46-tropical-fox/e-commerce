<template>
<!-- <div> -->
  <li class="cart-product-item">
    <div class="cart-product-item-left">
      <img :src="cart.Product.image_url" alt="">
      <div class="cart-product-item-left-detail">
        <h3>{{cart.Product.name}}</h3>
        <p>{{categoryName}}</p>
        <div>
          <button class="btn btn-secondary" @click.prevent="deleteCart" >remove</button>
        </div>
      </div>
    </div>
    <div class="cart-product-item-right">
      <div>
        <p>Quantity:</p>
        <input type="number" v-model="quantity" :max="gameStock" :min='0'>
      </div>
      <p>Rp. {{cart.Product.price }}</p>
    </div>
  </li>
<!-- </div> -->

</template>

<script>
import lodash from 'lodash'
import swal from 'sweetalert'

export default {
  name: 'CartItemCard',
  data () {
    return {
      quantity: this.cart.quantity
    }
  },
  props: ['cart', 'index'],
  methods: {
    updateQuantity () {
      const payload = {
        id: this.cart.id
      }
      this.$store.dispatch('updateCart', payload)
        .then((data) => {
          swal(data)
        })
    },
    deleteCart () {
      const payload = {
        id: this.cart.id
      }
      swal('Are you sure want to remove this item?', {
        buttons: {
          cancel: 'No',
          yes: 'Yeah'
        }
      })
        .then((data) => {
          // console.log(data);
          if (data === 'yes') {
            this.$store.dispatch('deleteCart', payload)
            this.$store.dispatch('fetchCartsData')
              .then((data) => {
                swal('data')
              })
          }
        })
    }
  },
  computed: {
    categoryName () {
      let categoryName
      if (this.categoriesData.length > 0) {
        this.categoriesData.forEach(category => {
          category.Products.forEach(game => {
            if (game.id === this.cart.ProductId) {
              categoryName = category.name
            }
          })
        })
        return categoryName
      }
    },
    categoriesData () {
      return this.$store.state.categoriesData
    },
    gameStock () {
      return this.cart.Product.stock
    }

  },
  watch: {
    quantity () {
      this.debouncedUpdateQuantity()
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
    this.debouncedUpdateQuantity = _.debounce(this.updateQuantity, 1000)
  }
}
</script>

<style>

</style>
