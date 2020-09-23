<template>
<div id="card">
  <div class="wrapper">
  </div>
  <main class="main">
    <div class="wrapper">
      <div class="items-grid">
        <div class="item" v-for="product in products" :key="product.id">
          <header class="item__header">
            <div class="item__title">
              <h3>{{product.name}}</h3>
              <h4>{{product.stock}} pcs</h4>
            </div>
          </header>
          <div class="item__body">
            <img class="item__img" :src="product.image_url">
            <div class="item__price">
            Rp. {{product.price.toLocaleString('id')}}
            </div>
          </div>
          <footer class="item__footer">
            <div class="item__add" @click="addCart(product.id)">
              <span class="item__plus"><i class="fas fa-cart-plus"></i></span><span class="item__text">Place in cart</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    addCart (id) {
      console.log(id, '<<< id product')
      this.$store.dispatch('addCart', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700&display=swap');

:root {
    --clr-head: #19120c;
    --clr-nav: #030303;
    --clr-sub: #6f6f6f;
    --clr-box: #1c1511;
    --fw-l: 300;
    --fw-r: 400;
    --fw-sb: 600;
    --fw-b: 700;
   box-sizing: border-box;
 }
 *, *::before, *::after {
   margin: 0;
   padding: 0;
   box-sizing: inherit;
 }
  html, body {
   width: 100%;
   min-height: 100vh;
   font-size: 62.5%;
 }
 body {
   font-size: 1.6rem;
   font-family: 'Nunito Sans', sans-serif;
   line-height: 1.6;
 }

h3 {
  font-size: 2.2rem;
  color: var(--clr-head);
  text-transform: uppercase;
  letter-spacing: -.5px;
  font-weight: var(--fw-sb);
}

small {
  color: var(--clr-sub);
}

ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: var(--clr-nav);
}

img {
  max-width: 100%;
  height: auto;
}

#app {
  max-width: 1400px;
  width: 100%;
  margin: auto;
}

.wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.header {
  min-height: 8.3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 3em 0 1.6em;
  border-bottom: 1px solid #17120c;
}

.list {
  display: flex;
  &--item {
    font-size: 1.4rem;
    text-transform: uppercase;
    margin-right: 3em;
    font-weight: var(--fw-sb);
  }
  &--item:last-child {
    margin-right: 0;
    }
}

// .header__logo {
//   margin-right: auto;
//   margin-left: auto;
// }

.header__cart {
  display: flex;
  align-items: center;
  color: var(--clr-nav);
}

.header__icon {
  display: inline-block;
  vertical-align: middle;
  padding-top: 6px;
  margin-right: 3em;
}

.header__text {
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: var(--fw-sb);
}

.header__name {
  display: inline-block;
  vertical-align: middle;
  margin-right: .5em;
}

.main {
  padding: 8em 0 4em;
}

.item {
  padding: 0 1.5em;
  margin-bottom: 3em;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(320px, 1fr));
  grid-gap: 3rem;
}

.item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item__img {
  margin-top: 2em;
  object-fit: cover;
  object-position: center;
}

.item__body {
  text-align: center;
}

.item__price {
  font-size: 2rem;
  font-weight: var(--fw-sb);
  margin-top: 2em;
}

.item__footer {
  margin-top: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: .8em 0;
}

.item__add:hover {
  font-size: 1.4rem;
  font-weight:var(--fw-sb);
  text-align: center;
  border: 1px solid var(--clr-head);
  padding: .8em 2.4em .8em 1.5em;
  background: #ffc60b;
}

.item__wishlist {
  font-size: 1.4rem;
  font-weight:var(--fw-sb);
  text-align: center;
  padding: .8em 1.4em;
  border-top: 1px solid var(--clr-head);
  border-right: 1px solid var(--clr-head);
  border-bottom: 1px solid var(--clr-head);
}

.item__text, .item__plus  {
  margin-right: .5em;
}

@media (max-width: 960px) {
  .header {
    padding: 0 1.5em;
  }
  .header__cart {
    display: none;
  }
  .header {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }

  .header__logo {
    margin-bottom: .5em;
  }

  .list--item {
    margin-right: 1em;
  }
}

  .items-grid {
    grid-gap: 1rem;
  }
</style>
