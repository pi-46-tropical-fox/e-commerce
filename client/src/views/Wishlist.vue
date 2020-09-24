<template>
  <div>
    <div v-if="myWishlist.length > 0">
      <div class="header text-center p-4">
            <h1>My Wishlist</h1>
      </div>
      <div class="container">
        <table class="table text-center">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" class="font-weight-bold" colspan="5">Wishlist</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in myWishlist" :key="item.id" class="mx-auto">
                    <td class="align-middle" ><img :src="item.Product.img_url" alt="" style="width: 100px;"></td>
                    <td class="align-middle" >{{ item.Product.name }} {{ item.Product.color }} {{ item.Product.capacity }}</td>
                    <td class="align-middle text-success" v-if="item.Product.stock > 0">Available stock: {{ item.Product.stock }}</td>
                    <td class="align-middle text-danger" v-else>Out of stock</td>
                    <td class="align-middle" >Rp. {{ item.Product.price.toLocaleString() }}</td>
                    <td class="align-middle" ><button @click.prevent="removeWishlist(item.ProductId)" class="btn btn-danger" >Remove</button> <button @click.prevent="addToCart(item.ProductId)" class="btn btn-primary" v-if="item.Product.stock > 0">Add to cart</button></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <div class="header text-center p-4">
            <h1>Your wishlist is empty</h1>
            <button class="btn btn-dark" @click.prevent="showListProduct">Add more wishlist</button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Wishlist',
  methods: {
    fetchWishlist () {
      this.$store.dispatch('fetchWishlist')
    },
    removeWishlist (productId) {
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
          this.$store.dispatch('removeWishlist', productId)
        }
      })
    },
    addToCart (productId) {
      if (this.$store.state.isLogin) {
        this.$store.dispatch('addToCart', productId)
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    showListProduct () {
      this.$router.push({ name: 'Products' })
    }
  },
  created () {
    this.fetchWishlist()
  },
  computed: {
    myWishlist () {
      return this.$store.state.myWishlist
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
