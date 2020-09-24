<template>
  <div>
    <b-card class="m-2">
      <div class="row">
        <div class="col-3">
          <img :src="cart.Product.img_url" class="imG" height="120px;" width ="120px;" />
        </div>
        <div class="productDetail col-8" style="width: 330px;">
          <h4>{{ cart.Product.name }}</h4>
          <h4 style="color: seagreen;">IDR {{ formatPrice(cart.Product.price) }}</h4>
          <div class="" style="align-content: flex-end">
            <div class="flex">
              <b-button-group size="">
                <b-button class="fa fa-minus my-2 btn-success" aria-hidden="true" @click="kurang(cart)"></b-button>
                <b-button class="fa fa-plus my-2 btn-danger" aria-hidden="true" @click="tambah(cart)"></b-button>
              </b-button-group>
              <input min="0" class="inputStock ml-3" readonly v-model="stockBeli" type="number" />
              <b-button class="fa fa-trash my-2 btn-dark" aria-hidden="true" @click="removeProduct(cart)"></b-button>
            </div>
            <div class="flex">
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
export default {
  name: 'CartCard',
  props: ['cart'],
  data () {
    return {
      stockBeli: this.cart.quantity
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.state.isUser = true
      this.$store.state.userName = localStorage.username
    }
    this.$store.dispatch('getMyCart')
  },
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    kurang (cart) {
      this.stockBeli--
      if (this.stockBeli > cart.Product.stock) {
        this.stockBeli = this.cart.quantity
        Swal.fire('We Are Sorry :(', 'Not enough stock of product', 'info')
      } else if (this.stockBeli === 0) {
        this.stockBeli = this.cart.quantity
        this.removeProduct(cart)
      } else if (this.stockBeli < 0) {
        this.stockBeli = this.cart.quantity
        Swal.fire('That Is Unusual.', 'Invalid amount of product', 'error')
      } else {
        const updateCart = {
          id: cart.Product.id,
          quantity: this.stockBeli
        }
        this.$store.dispatch('updateProductInCart', updateCart)
        Toast.fire({ icon: 'warning', title: 'removed product quantity successfully' })
      }
    },
    tambah (cart) {
      this.stockBeli++
      if (this.stockBeli > cart.Product.stock) {
        this.stockBeli = this.cart.quantity
        Swal.fire('We Are Sorry :(', 'Not enough stock of product', 'info')
      } else if (this.stockBeli === 0) {
        this.stockBeli = this.cart.quantity
        this.removeProduct(cart)
      } else if (this.stockBeli < 0) {
        this.stockBeli = this.cart.quantity
        Swal.fire('That Is Unusual.', 'Invalid amount of product', 'error')
      } else {
        const updateCart = {
          id: cart.Product.id,
          quantity: this.stockBeli
        }
        this.$store.dispatch('updateProductInCart', updateCart)
        Toast.fire({ icon: 'success', title: 'added product quantity successfully' })
      }
    },
    removeProduct (cart) {
      Swal.fire({
        title: 'Remove selected product?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('hapus', cart.Product.id)
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
    }
  },
  mounted () {
    // console.log(this.cart, 'dari mounted di CartCard')
  }
}
</script>

<style scoped>
.inputStock {
  text-align: center;
  border: none;
  width: 50px;
}
.imG {
  border-radius: 5%;
}
</style>
