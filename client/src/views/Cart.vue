<template>
  <div class="container mt-2">
    <h1>Your Cart :</h1>
    <button @click="back" class="btn btn-info d-flex my-3">Back to Homepage</button>
    <div v-for="cart in filteredCart" :key="cart.id" class="card mb-3">
      <div class="row no-gutters">
        <div class="col-4">
          <img :src="cart.Product.image_url" class="card-img" alt="">
        </div>
        <div class="col-8">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>{{ cart.Product.name }}</strong></li>
            <li class="list-group-item"><strong>Quantity : </strong>{{ cart.quantity }}</li>
            <li class="list-group-item">
              <strong>Total : {{ total(cart.quantity, cart.Product.price) }}</strong>
            </li>
          </ul>
          <button @click="buy(cart.Product.id, cart.Product.stock, cart.id, cart.quantity)" class="btn btn-success m-2">buy</button>
          <button @click="removeItem(cart.id)" class="btn btn-danger m-2">Remove Item</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    back () {
      this.$router.push('/')
    },
    total (quantity, price) {
      const result = quantity * price
      return result.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    },
    buy (productId, productStock, cartId, quantity) {
      const newStock = productStock - quantity
      this.$store.dispatch('updateProducts', { id: productId, stock: newStock })
        .then(() => {
          return this.$store.dispatch('updateCart', {
            id: cartId,
            quantity: 0,
            status: 'paid',
            ProductId: productId
          })
        })
        .then(({ data }) => {
          return this.$store.dispatch('fetchCart')
        })
        .then(({ data }) => {
          this.$store.commit('UPDATE_CART', data)
          return this.$store.dispatch('fetchProducts')
        })
    },
    removeItem (id) {
      this.$store.dispatch('deleteCart', { id })
        .then(({ data }) => {
          return this.$store.dispatch('fetchCart')
        })
        .then(({ data }) => {
          this.$store.commit('UPDATE_CART', data)
          return this.$store.dispatch('fetchProducts')
        })
    }
  },
  computed: {
    cartStore () {
      return this.$store.state.cart
    },
    filteredCart () {
      const result = []
      const cart = this.$store.state.cart
      cart.forEach(item => {
        if (item.quantity !== 0) {
          if (result.length) {
            result.forEach(res => {
              if (res.Product.id === item.Product.id) {
                res.quantity += item.quantity
              } else {
                result.push(item)
              }
            })
          } else {
            result.push(item)
          }
        }
      })
      return result
    }
  }
}
</script>
