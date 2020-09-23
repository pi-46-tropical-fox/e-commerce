<template>
  <div class="main">
    <header>
      <ul>
        <li><a href="#" @click.prevent="seeCart"><i class="fas fa-shopping-cart"></i>Cart</a></li>
        <li><a href="" @click.prevent="purchased">purchased</a></li>
        <li>-</li>
        <li><h1 id="logo" @click.prevent="back">foxshop</h1></li>
        <li>-</li>
        <li><a href="" @click.prevent="signIn">Sign In</a></li>
        <li><a href="#" @click.prevent="logout">Logout<i class="fas fa-sign-out-alt"></i></a></li>

      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    seeCart () {
      this.$router.push('/cart')
    },
    back () {
      this.$router.push('/')
    },
    signIn () {
      this.$router.push('/login')
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
    },
    purchased () {
      this.$router.push('/purchased')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');
#nav {
    padding: 30px;
    background: #2c3e50;
    height: 100vh;
    display: flex;
    flex-direction: column;
	text-align: center;
  }* {
    box-sizing: border-box;
    text-decoration: none;

}
ul{
  list-style-type: none;
}
html {
  font-size: -moz-calc(4px + 0.45vw);
  font-size: -webkit-calc(4px + 0.45vw);
	font-size: calc(4px + 0.45vw);
}
body {
	font-family: 'Montserrat', sans-serif;
	color: #000;
}
a {
	text-decoration: none;
    color: #000;

}
*:focus {
  outline: 0;
}
li h1 #logo{
    color: #3b5249;
    font-family: 'Abril Fatface', cursive;
}
/* Primary Style
--------------------------------*/
.main {
	max-width: 110rem;
	margin: 0 auto;
    padding: 0 2rem;
}
li a:hover{
    color:#ff414d;
}
header {
	line-height: 12rem;
	height: 12rem;
}
header h1 {
	font-size: 2.5rem;
	font-family: 'Oswald', sans-serif;
}
header ul::after {
	content: '';
	display: table;
	clear: both;
}
header li {
	float: left;
	width: 12.5%;
	text-align: center;
	text-transform: uppercase;
}
header li:nth-child(4) {
	width: 25%;
}
header li a {
	font-weight: 900;
	font-size: 1.2rem;
	letter-spacing: 2px;
}
header li:hover{
    color: #679b9b;
}
.text {
	font-size: 2rem;
	padding: 2rem 0;
	-moz-columns: 3;
	-webkit-columns: 3;
	columns: 3;
}
.text p {
	margin-bottom: 2rem;
}
@media screen and (max-width: 800px) {
	header ul li:not(:nth-child(4)) {
		display: none;
	}
	header ul li:nth-child(4) {
		width: 100%;
	}
}
/* Slider Style
--------------------------------------*/

.image {
	position: absolute;
	top: 0;
	left: 0;
	width: 70%;
	height: 100%;
	background-size: cover;
	background-position: 50% 50%;
	clip: rect(0, 80rem, 50rem, 80rem);
	transition: clip .5s cubic-bezier(0.99, 0.01, 0.45, 0.9) .5s;
  will-change: clip;
}
.content {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	padding: 2rem 0 0 2rem;
	font-size: 9rem;
	text-align: right;
}
.content h2 {
	text-overflow: ellipsis;
	overflow: hidden;
	transform: translateY(-30%);
	opacity: 0;
	transition: transform .5s, opacity .5s;
  will-change: transform, opacity;
}
.content a {
	display: inline-block;
	font-size: 2rem;
	text-transform: lowercase;
	padding: 1.5rem;
	opacity: 0;
	transform: translateY(-100%);
	transition: transform .5s .1s, opacity .5s .1s;
  will-change: transform, opacity;
}

nav {
	position: absolute;
	bottom: 0;
	right: 0;
	background: #fff;
	z-index: 2;
}

@media screen and ( max-width: 550px ) {
	.image { width: 100%; }
	.content { padding-right: 2rem; }
	nav { left: 0; right: auto; }
}
</style>
