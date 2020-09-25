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
                <div v-if="data.stock < 1">
                    Item habis
                </div>
                <div v-else>
                    <div v-if="!isInCart">
                        <button v-if="!showQuantitySelector" @click.prevent="toggleQuantity" class="btn btn-primary">Add to cart</button>
                        <div v-if="showQuantitySelector">
                            <button @click.prevent="toggleQuantity" class="btn btn-primary">Cancel</button>
                            <form @submit.prevent="addToCart">
                                <input v-model="quantity" type="number" class="form-control" placeholder="Qty" :max="data.stock" >
                                <button class="btn btn-primary">Add to cart</button>
                            </form>
                        </div>
                    </div>
                    <div v-else>
                        <p>Item is already in cart</p>
                    </div>

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
            showQuantitySelector : false,
            quantity : 1
        }
    },
    computed: {
        isInCart(){
            return this.$store.state.cart.find(e => e.Product.id === this.data.id)
        },
        price(){
            return this.data.price
        }
    },
    methods : {
        addToCart(){
            this.$store.dispatch('addToCart', { ...this.data, quantity : Number(this.quantity) }).then(() => {
                this.$swal.fire({
                    icon: 'success',
                    title: 'Item added to your cart!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(e => {
                this.$swal.fire({ icon : 'error', title: 'Oops...', text : e.response.data.errors.join('\n') })
            })
        },
        toggleQuantity(){
            this.showQuantitySelector = !this.showQuantitySelector
        }
    },
    created(){
        console.log(this.$store.state.cart)
    }
}
</script>
