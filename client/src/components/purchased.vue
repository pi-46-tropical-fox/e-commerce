<template>
  <div id="container">
  <div class="container d-flex justify-content-center mb-3">
    <h2>Purchased History</h2>

  </div>
<table >
  <tr style="text-align:center;font-weight:bold;">
    <td>-</td>
    <td>Name</td>
    <td>Amount</td>
    <td>Subtotal</td>
  </tr>

  <tr class="p" v-for="cart in carts" :key="cart.id">
    <td class="image"><img :src="cart.Product.image_url" /></td>
    <td class="name">{{cart.Product.name}}</td>
    <td class="amount"><input type="number" value="3" min="0" />{{cart.quantity}}</td>
    <td class="pricesubtotal">Rp. {{new Number(cart.Product.price * cart.quantity).toLocaleString("id-ID")}}</td>
  </tr>

</table>
<div id="footer">

  <hr />
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    carts () {
      const carts = this.$store.state.carts
      const data = carts.filter(cart => cart.status == true)
      this.product = data
      return data
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style scoped>
body {
  background: #34373e;
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
  color: white;
  font-size: 16px;
  overflow-y: scroll;
}

#expand {
  cursor: pointer;
}

#coolstuff {
  display: none;
}

#container {
  width: 100%;
  max-width: 800px;
  margin: auto;
  text-align: center;
}

ul {
  text-align: left;
}

hr {
  border-color: white;
  border-bottom: 0;
}

table {
  width: 100%;
  margin: auto;
  text-align: center;
}

tr {
  padding: 0;
  margin: 0;
  border: 0;
}

td {
  padding: 5px 2px;
}

.image {
  width: 150px;
}

.image > img {
  width: 100%;
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 7px rgba(0,0,0,0.4);
}

.amount {
  width: 50px;
}

.amount > input {
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
  color: white;
  font-size: 16px;
  background: transparent;
  border: none;
  width: 100%;
  text-align: center;
  outline: none;
}

.remove {
  width: 30px;
}

.remove > div {
  border-radius: 10px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  padding: 2px;
  transition: background .3s, border .3s, transform .3s;
  cursor: pointer;
  text-align: center;
  margin: auto;
  border: 1px solid white;
}

.remove.hey > div {
  background: red;
  border-color: red;
  transform: scale(1.3);
}

.remove:hover > div {
  background: red;
  border-color: red;
}

.big {
  font-size: 2em;
  font-weight: bold;
}

#checkout {
  padding: 10px;
  font-size: 16px;
  color: white;
  display: inline-block;
  margin: 2px;
  border-radius: 3px;
  text-align: center;
  transition: background 0.2s;
  background: #0a8f6c;
  cursor: pointer;
}

#checkout > span {
  width: 0;
  display: inline-block;
  overflow: hidden;
  transition: width .3s;
  text-align: right;
}

#checkout:hover > span {
  width: 20px;
}

#footer {
  opacity: 0.6;
  border-top: 1px solid white;
  padding-top: 10px;
  text-align: center;
  margin-top: 15px;
}

#footer a {
  color: white;
}
.btn:hover{
  background-color:#0a8f6c ;
}
</style>
