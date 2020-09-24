<template>
    <div class="card">
        <div class="tab-wrapper">
            <a href="#" @click.prevent="setCurrentTab('login')">
                <span class="tab" :class="currentTab === 'login' ? 'active' : ''" id="login-tab">Login</span>
            </a>
            <a href="#" @click.prevent="setCurrentTab('register')">
                <span class="tab" :class="currentTab === 'register' ? 'active' : ''" id="register-tab">Register</span>
            </a>
        </div>

        <div class="wrapper">
            <!-- LoginForm -->
            <LoginForm v-if="currentTab === 'login'" />
            <!-- RegisterForm -->
            <RegisterForm @setCurrentTab="setCurrentTab" v-else-if="currentTab === 'register'" />
        </div>

        <!-- GoogleLogin -->
        <GoogleLogin v-if="currentTab === 'login'" />
    </div>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import GoogleLogin from './GoogleLogin'

export default {
    components: {
        LoginForm,
        RegisterForm,
        GoogleLogin
    },

    data() {
        return {
            currentTab: 'login'
        }
    },

    methods: {
        setCurrentTab(payload){
            this.currentTab = payload
        },

        isActive(name){
            return this.currentTab === name
        }
    }
}
</script>

<style>
</style>