<template>
  <tr>
    <td class="product__cart__item">
      <div class="product__cart__item__pic">
        <img :src="cart.Product.image_url" alt />
      </div>
      <div class="product__cart__item__text">
        <h5>{{ cart.Product.name }}</h5>
        <h5>Rp{{ cart.Product.price }}</h5>
      </div>
    </td>
    <td class="quantity__item"></td>
    <td class="quantity__item">
      <h5>{{ cart.quantity }}</h5>
    </td>
    <td class="cart__price">Rp {{ total }}</td>
    <td class="cart__close">
      <a @click.prevent="deleteCart" href="">
        <i class="fa fa-close"></i>
      </a>
    </td>
    <td class="cart__close">
      <form @submit.prevent="updateQty" class="form-inline">
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputPassword2" class="sr-only">Password</label>
          <input
            v-model="updatedQty"
            type="text"
            class="form-control"
            id="updateQuantity"
            placeholder="Update Quantity"
          />
        </div>
        <button style="margin:auto" type="submit" class="btn btn-primary mb-2">
          Update Qty
        </button>
      </form>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CardCart",
  props: ["cart"],
  data() {
    return {
      updatedQty: null
    }
  },
  computed: {
    total() {
      return this.cart.Product.price * this.cart.quantity;
    },
  },
  methods: {
    deleteCart() {
      this.$store.dispatch("deleteCart", this.cart.Id).then(() => {
        this.$store.dispatch("fetchCarts");
        // return this.$router.push('/cart')
      });
    },
    updateQty() {
      let payload = {
        id: this.cart.Id,
        updatedQty: this.updatedQty
      }
      this.$store.dispatch("updateCartQty", payload).then(() => {
        this.updatedQty = null
        this.$store.dispatch("fetchCarts");
        // return this.$router.push('/cart')
      });
    }
  },
};
</script>

<style>
</style>
