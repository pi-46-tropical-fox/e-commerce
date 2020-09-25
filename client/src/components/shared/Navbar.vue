<template>
<nav class="flex items-center justify-between flex-wrap bg-gray-800 p-2 fixed w-full z-10 top-0">
		<div class="flex items-center flex-shrink-0 text-white mr-6">
			<router-link class="text-white no-underline hover:text-white hover:no-underline" to="/">
				<span class="text-2xl pl-2"><img src="/assets/logo.png" width="48" class="inline"> RGB Commerce</span>
			</router-link>
		</div>

		<div class="block lg:hidden">
			<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>

		<div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
			<ul class="list-reset lg:flex justify-end flex-1 items-center">
				<li class="mr-3" v-if="!isLoggedIn">
                    <router-link to="/auth">Login</router-link>
				</li>
				<li class="mr-3" v-if="isLoggedIn">
                    <router-link to="/cart">Your Cart</router-link>
				</li>
				<li class="mr-3" v-if="isLoggedIn">
                    <router-link to="/wishlist">Wishlist</router-link>
				</li>
				<li class="mr-3" v-if="isLoggedIn">
                    <a href="#" @click.prevent="logout">Logout</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        isLoggedIn(){
            return this.$store.state.isLoggedIn
        }
	},
	methods: {
		logout(){
			this.$store.dispatch('logout')
		}
	}
};
</script>

<style>
nav {
    padding: 30px;
}

nav a {
    @apply text-white;
    @apply inline-block text-gray-600 no-underline py-2 px-4;
    font-weight: bold;
    @apply transition-colors duration-200;
}

nav a:hover {
    @apply text-gray-200;
}

nav a.router-link-exact-active {
    color: #42b983;
}

</style>