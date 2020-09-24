<template>
    <div class="columns cart-container">
        <table class="table is-bordered column is-two-thirds is-hoverable">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cart in carts" :key="cart.id">
                    <td>
                        <img :src="cart.product.image_url" alt="" style="width: 75px; height: auto">
                    </td>
                    <td>{{ cart.product.name }}</td>
                    <td>{{ cart.product.price.toLocaleString('id', { style: 'currency', currency: 'IDR' }) }}</td>
                    <td>{{ cart.quantity }}</td>
                    <td>
                        <button type="submit" class="button" @click.prevent="removeCart(cart.id)">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="column checkout-container">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  The total amount of
                </p>
              </header>
              <div class="card-content">
                <div class="content has-text-right" v-for="cart in carts" :key="cart.id">
                    <p>{{ cart.product.name }} : {{ (cart.product.price*cart.quantity).toLocaleString('id', { style: 'currency', currency: 'IDR' }) }}</p>
                </div>
                <p class="has-text-right">Total: {{ total.toLocaleString('id', { style: 'currency', currency: 'IDR' }) }}</p>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item btn title is-6" @click.prevent="checkout(cartsId)">Pay</a>
              </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TableCart',
  methods: {
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
        .then(({ data }) => {
          console.log(data.message)
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log({ err })
        })
    },
    checkout (cartsId) {
    //   this.$store.dispatch('checkout', cartsId)
        // .then(({ data }) => {
        //   console.log(data.message)
        //   this.$router.push({ name: 'Home' })
        // })
        // .catch(err => {
        //   console.log({ err })
        // })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    cartsId () {
      return this.$store.state.cartsId
    },
    total () {
      return this.$store.state.total
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>

</style>
