<template>
  <div>
    <div class="cart-item md-elevation-2">
      <div>
        <img class="image" :src="cart.Product.image_url" alt="" />
      </div>
      <div class="cart-detail">
        <h1>{{ cart.Product.name }}</h1>
        <h4>You're Buying {{ cart.quantity }} of This Item</h4>
        <form @submit.prevent="changeQty(cart.id, cart.quantity)">
          <div style="display:flex;">
            <md-field>
              <md-input
                v-model="cart.quantity"
                type="number"
                min="0"
                :max="cart.Product.stock"
              ></md-input>
            </md-field>
            <md-button type="submit">Change</md-button>
          </div>
        </form>
        <p style="font-size:10px;">
          Press The Change Button If You Want To Change The Qty
        </p>
        <div class="description-peritem">
          <h5>Price $ {{ cart.Product.price.toLocaleString() }}</h5>
          <h5> Available Stock {{ cart.Product.stock }}</h5>
        </div>
        <md-button
          class="md-raised md-accent"
          style="font-size:12px;"
          @click="deleteCart(cart.id)"
          >Cancel Order <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    cart: Object,
  },
  methods: {
    deleteCart(id) {
      this.$emit("deleteCart", id);
    },
    changeQty(id, qty) {
      const data = {
        id,
        qty,
      };

      this.$store
        .dispatch("editCart", data)
        .then((res) => {
          this.$swal.fire({
            icon: "success",
            title: res.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.$store.dispatch("fetchCart")
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "err",
            title: err.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
    },
  },
};
</script>

<style>
.image {
  width: 15em;
}

.cart-item {
  width: 50em;
  padding: 2em;
  margin: 2em 0;
  display: flex;
}

.cart-detail {
  margin-left: 2em;
}

.description-peritem {
  display: flex;
  justify-content: space-evenly;
}
</style>
