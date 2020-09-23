<template>
  <div>
    <div v-if="myCart.carts.length > 0">
      <div class="header text-center p-4">
            <h1>My Cart</h1>
      </div>
      <div class="container">
        <table class="table text-center">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Cart ( Total: {{ myCart.carts.length }} )</th>
                    <th scope="col">Detail Product</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody class="table-bordered">
                <tr v-for="cart in myCart.carts" :key="cart.ProductId" class="mx-auto">
                    <td class="align-middle" ><img :src="cart.Product.img_url" alt="" style="width: 100px;"></td>
                    <td class="align-middle" >{{ cart.Product.name }} {{ cart.Product.color }} {{ cart.Product.capacity }}</td>
                    <td class="align-middle" ><span @click.prevent="decrementQty(cart.ProductId, cart.qty)"><font-awesome-icon icon="minus-square" /></span>  {{ cart.qty }}  <span @click.prevent="incrementQty(cart.ProductId)"><font-awesome-icon icon="plus-square" /></span></td>
                    <td class="align-middle" >Rp. {{ cart.Product.price.toLocaleString() }}</td>
                    <td class="align-middle" >Rp. {{ (cart.qty * cart.Product.price).toLocaleString() }}</td>
                    <td class="align-middle" ><button @click.prevent="removeCart(cart.ProductId)" class="btn btn-danger" >Remove</button></td>
                </tr>
                <tr class="table-active">
                    <td class="align-middle font-weight-bold" colspan="2">Sub Total</td>
                    <td class="align-middle font-weight-bold">{{ myCart.grandTotal.qty }}</td>
                    <td class="align-middle font-weight-bold" colspan="2">Rp. {{ myCart.grandTotal.price.toLocaleString() }}</td>
                    <td class="align-middle" ><button @click.prevent="previewOrder" class="btn btn-primary" >Checkout</button></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <div class="header text-center p-4">
            <h1>Your cart is empty</h1>
            <button class="btn btn-dark" @click.prevent="showListProduct">Add more product</button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    incrementQty (productId) {
      this.$store.dispatch('addToCart', productId)
    },
    decrementQty (productId, qty) {
      console.log(productId)
      if (qty === 1) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('removeCart', productId)
          }
        })
      } else {
        this.$store.dispatch('decrementQty', productId)
      }
    },
    removeCart (productId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('removeCart', productId)
        }
      })
    },
    showListProduct () {
      this.$router.push({ name: 'Products' })
    },
    previewOrder () {
      if (this.$store.state.currentProfile.address && this.$store.state.currentProfile.phone) {
        this.$router.push({ path: '/carts/checkout' })
      } else {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  created () {
    this.fetchCart()
  },
  computed: {
    myCart () {
      return this.$store.state.myCart
    }
  }
}
</script>

<style>
tbody span {
    cursor: pointer;
    padding: 5px;
}
</style>
