<template>
<div class="d-flex align-items-center min-vh-100">
    <div class="container">
        <h1 class="d-flex display-1 justify-content-center mb-5 font-italic font-weight-light">E-Commerce</h1>
        <form id="form-login" style="max-width: 60%;" class="mx-auto card shadow rounded" @submit.prevent="register()">
            <div class="card-body">
                <h1 class="card-title p-2 font-italic">REGISTER</h1>
                <br>
                <div class="form-group">
                    <label for="login-email">Email address</label>
                    <input type="email" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Register</button>
            </div>
        </form>
        <router-link to="/login" class="d-flex justify-content-center mt-5">Already have an account? Login Here!</router-link>
    </div>
</div>
    
</template>
<script>
export default {
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            const payload = {email: this.email, password: this.password}
            this.$store.dispatch('register', payload)
            .then(()=>{
                this.$router.push('/login')
            })
        }
    }
}
</script>