<template>
  <div class="container-card">
    <div class="row">
        <div class="images">
          <img class="product-img" :src="value.image_url" alt="Card image cap" />
        </div>
        <div class="product float-right my-5 ml-4">
          <p>{{ value.category }}</p>
          <h1>{{ value.name }}</h1>
          <h2>Rp. {{ new Number(value.price).toLocaleString("id-ID") }}</h2>
          <div class="buttons">
            <button class="add" @click="getId(value.id)">Add to Cart</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ["value"],
  methods:{
    getId (id) {
      if(!localStorage.getItem('access_token')){
        return this.$router.push('/login')
      }else{
        return this.$store.dispatch('addToCart', id)
      }
    }
  }

};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");
$font: "Lato", sans-serif;

$white: #f5f5f5;
$light: #e0e0c9;
$tan: #c3bea0;
$pink: #d9b7aa00;
$rose: #585858;
$dark: #4e4e4e;

/* center container in the middle */
html {
  display: grid;
  min-height: 100%;
}

body {
  display: grid;
  background: $light;
  font-family: $font, sans-serif;
  text-transform: uppercase;
}

.container-card {
  position: relative;
  margin: auto;
  overflow: hidden;
  width: 520px;
  height: 350px;
  background: $white;
  box-shadow: 5px 5px 15px rgba($rose, 0.5);
  border-radius: 10px;
  // overflow: scroll;
}

p {
  font-size: 0.6em;
  color: $rose;
  letter-spacing: 1px;
}

h1 {
  font-size: 1.2em;
  color: $dark;
  margin-top: -5px;
}

h2 {
  color: $tan;
  margin-top: -5px;
}

img {
  width: 290px;
  margin-top: 47px;
  margin-right: 35%;
}

.images{
  max-height: 70px;
}

.slideshow-buttons {
  top: 70%;
  display: none;
}

.one,
.two,
.three,
.four {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $light;
}

.one {
  left: 22%;
}
.two {
  left: 27%;
}
.three {
  left: 32%;
}
.four {
  left: 37%;
}

.product {
  width: 40%;
  height: 100%;
  top: 25%;
  left: 25%
}

.desc {
  text-transform: none;
  letter-spacing: 0;
  margin-bottom: 17px;
  color: $dark;
  font-size: 0.7em;
  line-height: 1.6em;
  margin-right: 25px;
  text-align: justify;
}

button {
  background: darken($light, 10%);
  padding: 10px;
  display: inline-block;
  outline: 0;
  border: 0;
  margin: -1px;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: $white;
  cursor: pointer;
  &:hover {
    background: $rose;
    transition: all 0.4s ease-in-out;
  }
}

.add {
  width: 67%;
}

.like {
  width: 22%;
}

.sizes {
  display: grid;
  color: $pink;
  grid-template-columns: repeat(auto-fill, 30px);
  width: 60%;
  grid-gap: 4px;
  margin-left: 20px;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
}

.pick {
  margin-top: 11px;
  margin-bottom: 0;
  margin-left: 20px;
}

.size {
  padding: 9px;
  border: 1px solid $light;
  font-size: 0.7em;
  text-align: center;
  &:hover {
    background: $rose;
    color: $white;
    transition: all 0.4s ease-in-out;
  }
}

.focus {
  background: $rose;
  color: $white;
}
</style>
