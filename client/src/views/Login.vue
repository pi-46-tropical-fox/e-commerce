<template>
    <div class="container">
        <div class="card my-3">
            <div class="card-body">
                <h1>Login</h1>
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label>Email</label>
                        <input v-model="email" placeholder="Email" class="form-control" type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="password" placeholder="Password" class="form-control" type="password" required>
                    </div>
                    <div class="form-group float-right">
                    <button class="btn btn-success">Login</button>
                    </div>
                </form>
                <router-link to="/register">Don't have an account yet? Register Here!</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            email : '',
            password : ''
        }
    },
    methods : {
        login(){
            this.$store.dispatch('login', {
                email : this.email,
                password : this.password
            }).then(() => {
                this.$router.push('/')
            }).catch(e => {
                this.$swal.fire({ icon : 'error', title: 'Oops...', text : e.response.data.errors.join('\n') })
            })
        }
    }
}
</script>
