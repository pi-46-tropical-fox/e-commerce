<template>
  <div class="container">
    <br><br><br>
<hr>
    <b-row class="">
      <b-col>
        <img :src="product.img_url" alt="img" class="imageBox ml-5" id="class" />
      </b-col>

      <b-col md="5" class="my-auto">
        <div class="row md-5 ">
          <div>For {{ product.category }}</div>
        </div>
        <div class="row md-5 ">
          <h1 class="">{{ product.name }}</h1>
        </div>
        <div class="row md-5  line mb-2 mt-2 pt-2">
          <h6 class="miring">"{{ product.description }}"</h6>
        </div>
        <div class="row md-5 ">
          <h2>IDR {{ priceFormat(product.price) }}</h2>
        </div>
        <div class="row md-5 ">
          <h3 >Stock: {{ product.stock }}</h3>
        </div>
        <div class="row md-5 " style="bottom: 0px;">
          <b-button type="button" style="color: white" class="btn btn-warning btn-block ml-0" size="lg" @click="addToCart">Add To Cart</b-button>
        </div>
      </b-col>

    </b-row><hr>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'DetailsForm',
  props: ['product', 'cart'],
  data () {
    return {
      demand: 0
    }
  },
  methods: {
    kurang () {
      // this.demand -= 1
      this.demand--
    },
    tambah () {
      // this.demand += 1
      this.demand++
    },
    addToCart () {
      this.demand++
      // console.log('masuk addToCart detail >>>>')
      if (!localStorage.access_token) {
        Swal.fire('Hold on.', 'You have to login first', 'info')
      } else if (this.demand <= 0) {
        Swal.fire('Unable Add Product To Cart', 'Set at least an amount', 'error')
      } else if (this.product.stock === 0) {
        Swal.fire('We Are Sorry :(', 'Product is currently out of stock', 'warning')
      } else if (this.product.stock < this.demand) {
        Swal.fire('Oooppss!!', 'Not enough stock based on your demand', 'warning')
      } else {
        const tambahCart = {
          id: this.product.id,
          quantity: this.demand
        }
        this.$store.dispatch('addToCart', tambahCart)
      }
    },
    priceFormat (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style>
.imageBox {
  height: 450px;
  box-shadow: 0px 5px 5px #dfdfdf;
  transition: 1s;
  z-index: 1000;
  margin: 100px;
  display: block;
  border: 0px solid #6A6462;
}
.imageBox:hover {
  transform: scale(1.45);
  cursor: zoom-in;
}
.line {
  border-bottom: 3px solid grey;
  border-top: 3px solid grey;
  margin-top: auto;
}
.miring {
  font-style: italic;
}
#content {
  bottom: 0px;
}
</style>
