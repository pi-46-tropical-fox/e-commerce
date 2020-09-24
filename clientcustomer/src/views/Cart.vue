<template>
  <div class="d-flex">
    <b-row class="text-center">
      <div v-if="this.$store.state.cartArr.length == 0" style="width: 508px; margin-top: 150px">
        <h2>Cart List is Empty</h2>
        <h5>Add a product to fill cart list</h5>
      </div>

        <div v-if="this.$store.state.cartArr.length != 0" class="cardWrapper" style="margin-top: 80px;">
          <CartCard
            v-for="(cart, index) in filter"
            :key="index"
            :cart="cart"
            style="margin-bottom:25px;"
          ></CartCard>
        </div>

      <b-card
        border-variant="success"
        header="Complete Your Purchase"
        header-border-variant="success"
        align="center"
        style="height: 225px; margin-top: 88px; margin-bottom: 50px; width: 550px; margin-left: 25px"
      >
        <div class="row">
          <div class="col-4">
            <h3 style="text-align: left;">Total Price:</h3>
          </div>
          <div class="col-8">
            <h3 style="text-align: right;">IDR {{ formatPrice(Number(totalPrice)) }}</h3>
          </div>
        </div>
        <hr>
        <b-button href="#" block variant="success" @click="confirmPayment()">Confirm Payment!</b-button>
      </b-card>

    </b-row>
  </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  components: {
    CartCard
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
    confirmPayment () {
      if (this.totalPrice <= 0) {
        Swal.fire('Stop!', 'Insert a product to confirm payment', 'error')
      } else {
        Swal.fire({
          title: 'Excellent!',
          icon: 'success',
          html: `<h2>IDR ${this.formatPrice(Number(this.totalPrice))}</h2><small>Please transfer to an account below.</small><div><img src="https://i.pinimg.com/originals/fa/b0/31/fab0316777f1e21b9bfbbe888872df29.png" style="width: 70px; height: 40px;" alt="">Abdul Syukur - 1260007070xxx</div><div><img src="https://cdn.clipart.email/010c6e07c497361dfbadca178717b1aa_ovo-indonesia-logo-png_1026-464.png" style="width: 70px" alt="">Abdul Syukur- +6281123456xxx</div>`,
          footer: '<small>Gudang Kaos™<small>',
          showCancelButton: true,
          confirmButtonColor: '#f6b83f',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Checkout from store'
        })
          .then((result) => {
            this.$store.dispatch('checkOut', this.$store.state.cartArr)
          })
          .catch(() => { console.log('SWAL PAGE ERROR') })
      }
    }
  },
  computed: {
    filter () {
      const cartArr = this.$store.state.cartArr
      const kotak = []
      var flag = false
      for (var i = 0; i < cartArr.length; i++) {
        flag = true
        for (var j = 0; j < kotak.length; j++) {
          if (kotak.length === 0) {
            flag = true
          } else if (kotak[j].Product.name === cartArr[i].Product.name) {
            flag = false
          }
        }
        if (flag) {
          kotak.push(cartArr[i])
        }
      }
      return kotak
    },
    totalPrice () {
      let total = 0
      for (var i = 0; i < this.$store.state.cartArr.length; i++) {
        total += Number(this.$store.state.cartArr[i].totalPrice)
      }
      return total
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
.d-flex {

  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
