<template>
    <div class="container mx-3 my-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <img class=" card-img-top" :src="data.image_url">
                <h3 class="card-title">{{data.name}}</h3>

                <h5 class="card-title">{{price}}</h5>
                <h6 class="card-title">Stock {{data.stock}}</h6>
            </div>
            <div class="card-footer">
                <button v-if="!showQuantitySelector" @click.prevent="toggleQuantity" class="btn btn-primary">Add to cart</button>
                <div v-if="showQuantitySelector">
                    <button @click.prevent="toggleQuantity" class="btn btn-primary">Cancel</button>
                    <form @submit.prevent="addToCart">
                        <input type="number" class="form-control" placeholder="Qty" :max="data.stock" >
                        <button class="btn btn-primary">Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['data'],
    data(){
        return {
            showQuantitySelector : false
        }
    },
    computed: {
        price(){
            return  this.data.price
        }
    },
    methods : {
        addToCart(){
            this.$store.dispatch('addToCart', this.data)
        },
        toggleQuantity(){
            this.showQuantitySelector = !this.showQuantitySelector
        }
    }
}
</script>
