<template>
  <div class="purchase">
    <h3>Purchase</h3><br>
    <h4>Total Items : <span>{{totalItem}}</span></h4><br>
    <h4>Total Price : <span>Rp. {{totalPrice.toLocaleString()}}</span></h4><br>
    <button class="btn btn-info" @click.prevent="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['carts'],
  computed: {
    totalItem () {
      return this.carts.length
    },
    totalPrice () {
      let total = 0
      this.carts.forEach(cart => {
        total += cart.quantity * cart.Product.price
      })
      return total
    },
    products: {
      get () {
        return this.$store.state.products
      }
    }
  },
  methods: {
    checkout () {
      this.carts.forEach(cart => {
        const product = this.products.filter(function (product) {
          return product.id === cart.ProductId
        })
        console.log(product, cart)
        if (product[0].stock > cart.quantity) {
          const payload = {
            ProductId: cart.ProductId,
            name: cart.Product.name,
            image_url: cart.Product.image_url,
            price: cart.Product.price,
            stock: product[0].stock - cart.quantity,
            gender: cart.Product.gender,
            CategoryId: cart.Product.CategoryId
          }
          this.$store.dispatch('createHistory', cart)
            .then(() => {
              this.$store.dispatch('updateProduct', payload)
              this.$store.dispatch('deleteCart', cart.id)
              this.$store.commit('SET_NOTIFICATION', ['Purchased Success'])
              this.$store.commit('SET_COLOR', ['success'])
              setTimeout(() => {
                this.$store.commit('SET_NOTIFICATION', [])
              }, 3000)
            })
        } else {
          console.log('<<< ini dr checkout')
          this.$store.commit('SET_NOTIFICATION', ['Sorry, not enough stock'])
          this.$store.commit('SET_COLOR', ['warning'])
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 3000)
        }
      })
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }

}
</script>

<style>
.purchase {
  margin-top: 50px;
}

</style>
