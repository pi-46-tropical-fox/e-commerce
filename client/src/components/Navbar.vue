<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/books-stack-of-three.png"
                    alt="Bookthrift"
                />
                <h1 class="title is-4">Bookstore</h1>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div" v-if="!isAuthenticated">
                <div class="buttons">
                    <router-link
                        class="button is-primary"
                        :to="{ path: '/signup' }"
                    >
                        <strong>Sign up</strong>
                    </router-link>
                    <router-link
                        class="button is-light"
                        :to="{ path: '/signin' }"
                    >
                        Sign in
                    </router-link>
                </div>
            </b-navbar-item>
            <b-navbar-item tag="div" v-if="isAuthenticated">
                <router-link class="button is-primary" :to="{ path: '/cart' }">
                    <span class="icon">
                        <i class="fas fa-shopping-cart"></i>
                    </span>
                    <strong>Cart</strong>
                </router-link>
                <b-button
                    class="ml-2"
                    type="is-danger is-light"
                    @click.prevent="signout"
                    >Sign Out</b-button
                >
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Navbar',

    computed: {
        ...mapState({
            isAuthenticated: state => state.auth.isAuthenticated,
        }),
    },

    methods: {
        ...mapActions({
            checkAuthenticated: 'auth/checkAuthenticated',
        }),
        signout() {
            localStorage.clear();
            this.$router.push('/');
            this.checkAuthenticated();
        },
    },

    created() {
        this.checkAuthenticated();
    },
};
</script>

<style></style>
