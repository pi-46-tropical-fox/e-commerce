<template>
  <div class="cartItemEdit">
    <div v-if="cart.Product">
      <img class="cartEdit" :src="cart.Product.image_url" :alt="cart.Product.name" srcset="">
    </div>
    <div class="detailCartEdit" v-if="cart.Product">
      <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
      <h3>{{cart.Product.name}}</h3>
      <span class="mt-3 mb-3">Price : Rp. {{cart.Product.price.toLocaleString()}}</span>
      <span class="mt-3 mb-3">Quantity :
        <input
          class="quantity"
          type="number"
          v-model="cart.quantity"
        >
      </span>
      <div>
        <b-button class="mr-3" href="#" variant="primary" @click.prevent="updateCart">Edit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCartItem',
  computed: {
    cart: {
      get () {
        return this.$store.state.cart
      }
    },
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },
  methods: {
    updateCart () {
      this.$store.dispatch('updateCart', this.cart)
        .then(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
            this.$router.push('/Cart')
          }, 1000)
        })
        .catch(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 2000)
        })
    }
  },
  created () {
    this.$store.dispatch('editCart', this.$route.params.id)
  }
}
</script>

<style>
.cartItemEdit {
  display: flex;
  flex-direction: row;
  justify-items: center;
  border:solid grey;
  max-width: 700px;
  margin: auto;
  margin-top: 70px;
}

.cartEdit {
  height: 300px;
  width: 300px;
}

.detailCartEdit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
  width:300px;
}

</style>
