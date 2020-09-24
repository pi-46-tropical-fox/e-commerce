<template>
    <p>Logging you out</p>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('logout')
        // this.$router.push('/login')
    }
}
</script>