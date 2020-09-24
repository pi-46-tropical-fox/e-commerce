<template>
    <div class="p-3 card" id="checkoutCard">
        <img :src="cart.Product.imageURL" class="card-img-top checkoutCard-image p-3" alt="...">
        <div class="checkoutCard-body">
            <h5 class="card-title">{{cart.Product.name}}</h5>
            <p class="card-text">{{currencyFormat}}</p>
            <p class="d-inline mr-3">Quantity: {{quantity}}</p>
            <div class="quantity d-inline">
             <i @click="addOne(cart.Product.id)" class="fas fa-plus-circle d-inline mr-1" v-if="quantity < cart.Product.stock"></i>
             <i @click="removeOne(cart.Product.id)"  class="fas fa-minus-circle d-inline"></i>
            </div>
            <i @click="removeItems(cart.id)" class="far fa-trash-alt ml-2"></i>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['cart'],
  data () {
    return {
      quantity: this.cart.quantity
    }
  },
  components: {
  },
  methods: {
    removeItems (id) {
      this.cart.quantity = 0
      this.$store.dispatch('removeItems', id)
    },
    addOne (id) {
      this.quantity += 1
      this.$store.dispatch('addToCart', id)
    },
    removeOne (id) {
      if (this.quantity == 1) {
        console.log('remove item dari remove one')
        this.$store.dispatch('removeItems', this.cart.id)
      } else {
        console.log('remove one')
        this.quantity -= 1
        this.$store.dispatch('removeOne', id)
      }
    }
  },
  computed: {
    currencyFormat () {
      const output = `Rp${new Intl.NumberFormat().format(this.cart.Product.price)},00`
      return output
    }
  }
}
</script>

<style>
i{
  cursor: pointer;
}
.quantity{
  display: flex;
}
#checkoutCard{
    display: flex;
    display: grid;
    grid-template-columns: minmax(auto, 200px) 1fr;
    grid-template-areas: 'img info';
    margin: 10px;
    background: #01579b;
    border-radius: 18px;
    background: linear-gradient(145deg, #014e8c, #015da6);
    box-shadow:  5px 3px 20px #012e52,
                -5px -5px 14px #0180e4;
}

.checkoutCard-image{
    grid-area: img;
    border-radius: 18px;
    background: #01579b;
    box-shadow: inset 5px 5px 14px #012e52, inset -5px -5px 14px #0180e4;
}
.checkoutCard-body {
    color: antiquewhite;
    grid-area: info;
    margin-left: 50px;
    margin-top: 20px;
}
.checkoutCard-card-footer {
    grid-area: action;

}

</style>
