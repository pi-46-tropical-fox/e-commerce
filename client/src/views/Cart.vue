<template>
  <div>
    <router-link :to="{name:'Home'}">Home</router-link>
    <h1>Shopping Cart</h1>
    <div class="shopping-cart">
      <div class="column-labels">
        <label class="product-image">Image</label>
        <label class="product-details">Product</label>
        <label class="product-price">Price</label>
        <label class="product-quantity">Quantity</label>
        <label class="product-removal">Remove</label>
        <label class="product-line-price">Total</label>
      </div>
      <ItemCart v-for="card in data" :value="card" :key="card.id"> </ItemCart>
      <CartPrice></CartPrice>
      <button class="checkout"  
      @click.prevent="getId(card.id)"
      >Checkout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import ItemCart from "../components/itemCart";
import CartPrice from "../components/cartPrice";
import Checkout from "../components/checkout"
export default {
  name: "Cart",
  data() {
    return {
      card: [],
    };
  },
  components: {
    ItemCart,
    CartPrice,
  },
  computed: {
    data() {
      return this.$store.state.cartData;
    },
  },
  methods: {
    fetchData() {
      return this.$store.dispatch("fetchCart");
    },
    getId (id) {
      console.log(id)
      this.$store.dispatch('addToCart',id)
      this.$store.dispatch('checkout')
      return this.$router.push({name: 'Checkout'})
    }
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
// @import "compass/css3";
@import "~compass-mixins/lib/compass/css3";

/*
I wanted to go with a mobile first approach, but it actually lead to more verbose CSS in this case, so I've gone web first. Can't always force things...

Side note: I know that this style of nesting in SASS doesn't result in the most performance efficient CSS code... but on the OCD/organizational side, I like it. So for CodePen purposes, CSS selector performance be damned.
*/

/* Global settings */
$color-border: #eee;
$color-label: #aaa;
$font-default: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, sans-serif;
$font-bold: "HelveticaNeue-Medium", "Helvetica Neue Medium";

/* Global "table" column settings */
.product-image {
  float: left;
  width: 20%;
}
.product-details {
  float: left;
  width: 37%;
}
.product-price {
  float: left;
  width: 12%;
}
.product-quantity {
  float: left;
  width: 10%;
}
.product-removal {
  float: left;
  width: 9%;
}
.product-line-price {
  float: left;
  width: 12%;
  text-align: right;
}

/* This is used as the traditional .clearfix class */
.group:before,
.group:after {
  content: "";
  display: table;
}
.group:after {
  clear: both;
}
.group {
  zoom: 1;
}

/* Apply clearfix in a few places */
.shopping-cart,
.column-labels,
.product,
.totals-item {
  @extend .group;
}

/* Apply dollar signs */
.product .product-price:before,
.product .product-line-price:before,
.totals-value:before {
  content: "$";
}

/* Body/Header stuff */
body {
  padding: 0px 30px 30px 20px;
  font-family: $font-default;
  font-weight: 100;
}

h1 {
  font-weight: 100;
}

label {
  color: $color-label;
}

.shopping-cart {
  margin-top: -45px;
}

/* Column headers */
.column-labels {
  label {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid $color-border;
  }

  .product-image,
  .product-details,
  .product-removal {
    text-indent: -9999px;
  }
}

/* Product entries */
.product {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid $color-border;

  .product-image {
    text-align: center;
    img {
      width: 100px;
    }
  }

  .product-details {
    .product-title {
      margin-right: 20px;
      font-family: $font-bold;
    }
    .product-description {
      margin: 5px 20px 5px 0;
      line-height: 1.4em;
    }
  }

  .product-quantity {
    input {
      width: 40px;
    }
  }

  .remove-product {
    border: 0;
    padding: 4px 8px;
    background-color: #c66;
    color: #fff;
    font-family: $font-bold;
    font-size: 12px;
    border-radius: 3px;
  }

  .remove-product:hover {
    background-color: #a44;
  }
}

/* Totals section */
.totals {
  .totals-item {
    float: right;
    clear: both;
    width: 100%;
    margin-bottom: 10px;

    label {
      float: left;
      clear: both;
      width: 79%;
      text-align: right;
    }

    .totals-value {
      float: right;
      width: 21%;
      text-align: right;
    }
  }

  .totals-item-total {
    font-family: $font-bold;
  }
}

.checkout {
  float: right;
  border: 0;
  margin-top: 20px;
  padding: 6px 25px;
  background-color: #6b6;
  color: #fff;
  font-size: 25px;
  border-radius: 3px;
}

.checkout:hover {
  background-color: #494;
}

/* Make adjustments for tablet */
@media screen and (max-width: 650px) {
  .shopping-cart {
    margin: 0;
    padding-top: 20px;
    border-top: 1px solid $color-border;
  }

  .column-labels {
    display: none;
  }

  .product-image {
    float: right;
    width: auto;
    img {
      margin: 0 0 10px 10px;
    }
  }

  .product-details {
    float: none;
    margin-bottom: 10px;
    width: auto;
  }

  .product-price {
    clear: both;
    width: 70px;
  }

  .product-quantity {
    width: 100px;
    input {
      margin-left: 20px;
    }
  }

  .product-quantity:before {
    content: "x";
  }

  .product-removal {
    width: auto;
  }

  .product-line-price {
    float: right;
    width: 70px;
  }
}

/* Make more adjustments for phone */
@media screen and (max-width: 350px) {
  .product-removal {
    float: right;
  }

  .product-line-price {
    float: right;
    clear: left;
    width: auto;
    margin-top: 10px;
  }

  .product .product-line-price:before {
    content: "Item Total: $";
  }

  .totals {
    .totals-item {
      label {
        width: 60%;
      }

      .totals-value {
        width: 40%;
      }
    }
  }
}
</style>
