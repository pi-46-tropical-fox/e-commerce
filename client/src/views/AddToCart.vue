<template>
  <div class="container">
    <button @click="back" class="btn btn-info d-flex my-3">Back</button>
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-4">
          <img :src="product.image_url" class="card-img" alt="">
        </div>
        <div class="col-8">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>{{ product.name }}</strong></li>
            <li class="list-group-item"><strong>{{ idr }}</strong> (Stock : {{ product.stock }})</li>
            <li class="list-group-item">
              <form @submit.prevent="addToCart">
                <strong>Total : </strong>
                <input type="number" v-model="quantity" :max="product.stock"><br />
                <button type="submit" class="btn btn-success mt-3">Add to Cart</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddToCart',
  data () {
    return {
      quantity: 0,
      status: 'unpaid'
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    addToCart () {
      this.$store.dispatch('addToCart', {
        quantity: +this.quantity,
        status: this.status,
        ProductId: +this.product.id
      })
        .then(({ data }) => {
          return this.$store.dispatch('fetchCart')
        })
        .then(({ data }) => {
          this.$store.commit('UPDATE_CART', data)
          this.$router.push('/cart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    product () {
      return this.$store.state.selectedProduct
    },
    idr () {
      return this.product.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    }
  },
  created () {
    const products = this.$store.state.products
    const product = products.find(product => product.id === +this.$route.params.id)
    this.$store.commit('UPDATE_SELECTED_PRODUCT', product)
  }
}
</script>
