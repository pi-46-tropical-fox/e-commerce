<template>
    <div class="card my-3 mx-3">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <div class="container">
                        <h1>{{data.Product.name}}</h1>
                        <h5 class="card-title">{{data.price}}</h5>
                        <h6 class="card-title">Stock {{data.Product.stock}}</h6>
                        <img style="width: 10em" :src="data.Product.image_url">
                    </div>
                </div>
                <div class="col-6">
                    <h4>Harga per item : {{data.Product.price}} </h4>
                    <h4>Harga total : {{data.Product.price * data.quantity}} </h4>
                </div>
                <div class="col-sm">
                    <form class="container">
                        <div class="form-group">
                            <input v-model="quantity" class="form-control" type="number" :max="this.data.Product.stock">
                        </div>
                        <button @click.prevent="updateQuantity" class="btn btn-warning" :disabled="quantity === data.quantity">Update Quantity</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button @click.prevent="deleteCart" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    props : ['data'],
    components : {

    },
    data(){
        return {
            quantity : this.data.quantity
        }
    },
    methods : {
        deleteCart(){
            this.$store.dispatch('deleteFromCart', this.data.id)
        },
        updateQuantity(){
            this.$store.dispatch('updateQuantity', { id : this.data.id, quantity : this.quantity })
        }
    },
    created(){
        console.log(this.data)
    }
}
</script>