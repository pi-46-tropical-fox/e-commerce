<template>
<div class="inner page-wrapper">
  <a href="" class="custom-card">
  <div class="card shadow" style="max-width: 14.38rem;" id="card-each"
    img-height="250"
    img-width="250"
  >
    <!-- :img-src="product.image_url"
    img-alt="Cover book image" -->
      <!-- Card image -->
      <img class="card-img-top" id="card-title" :src="product.image_url" style="height: 21rem;" alt="">

      <!-- Card content -->
      <div class="card-body">
        <!-- Title -->
        <h5 class="card-title" id="card-name"><a>{{product.name}} </a></h5>
        <!-- Text -->
        <p class="card-text" id="card-price"> Rp. {{product.price}},- </p>
        <div class="icons icon-stock-wrapper">
          <p class="card-text" id="card-stock"> Stock: {{product.stock}} </p>
          <span @click.prevent="addToCart" class="flaticon-add-to-basket"></span> 
        </div>
        <!-- Button -->
        <!-- <a href="#" id="button-detail" class="centering-btn stretched-link">Detail</a> -->
      </div>
    <!-- </div> -->
  </div>
  </a>
  
</div>
</template>

<script>
export default {
  name: 'CardBook',
  props: ['product'],
  methods: {
    addToCart () {
      const inputCart = {
        ProductId: this.product.id,
        quantity: +1
      }
      this.$store.dispatch('addToCart', inputCart)
    }
  }
  // computed: {
  //   role () {
  //     return this.$store.state.role
  //   }
  // },
  // mounted () {
  //   if (localStorage.role !== 'admin') {
  //     this.$router.push('/products')
  //   }
  // }
}
</script>

<style scoped>
@import '../font/flaticon.css';

h5, p {
  color: white;
}

a.custom-card,
a.custom-card:hover {
  text-decoration: none;
}

#card-each {
  /* background: rgb(20, 20, 20); */
  /* background: #00b894; */
  margin: 50px;
  background: #90CDE9;
  max-height: 43rem;
  color: black;
}

.inner {
  overflow: hidden;
}

.inner {
  transition: all 0.75s ease;
}

.inner:hover {
  transform: scale(1.1);
}

.icon-stock-wrapper {
  display: flex;
  justify-content: space-around;
}

.flaticon-add-to-basket {
  color:  white;
}
.flaticon-add-to-basket:hover {
  color:  #29b463;
}

[class^="flaticon-"]:before, [class*=" flaticon-"]:before,
[class^="flaticon-"]:after, [class*=" flaticon-"]:after {

font-size: 1.3em;

}

  /* background: #0088cc; */
  /* padding: 2%; */
  /* position: absolute; */
  /* top: 0; */
/* .centering-btn {
  left: 6rem;
  bottom: 5rem;
  right: 6rem;
} */

/* #button-detail {
  position: absolute;
  margin: 10px 0 0 0;
  bottom: 0px;
} */

</style>
