<template>
    <div class="container my-3">
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="register">
                    <h1>Register</h1>
                    <div class="form-group">
                        <label>Name</label>
                        <input required v-model="name" class="form-control" type="text" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input required v-model="email" class="form-control" type="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input required v-model="password" class="form-control" type="password" placeholder="Password">
                    </div>
                    <div class="form-group float-right">
                        <button class="btn btn-primary">Register</button>
                    </div>
                </form>
                <router-link to="/login">Already have an account? Login Here!</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name : '',
            email : '',
            password : ''
        }
    },
    methods : {
        register(){
            this.$store.dispatch('register', { email : this.email, password : this.password, name: this.name }).then(() => {
                this.$swal.fire('Success! Please login!')
                this.$router.push('/login')
            }).catch(e => {
                this.$swal.fire({ icon : 'error', title: 'Oops...', text : e.response.data.errors.join('\n') })
            })
        }
    }
}
</script>

