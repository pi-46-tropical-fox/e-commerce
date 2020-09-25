<template>
  <div>
    <div v-if="cartProducts.length > 0">
      <div
        class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
      >
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                >
                  ID
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Product Name
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Quantity
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Price
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="row in $props.cartProducts" :key="row.id">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500" >
                  <div class="text-sm leading-5 text-blue-900">
                    #{{row.id}}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500" >
                  <div class="text-sm leading-5 text-blue-900">
                    {{row.name}}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500" >
                  <div class="text-sm leading-5 text-blue-900">
                    {{row.qty}}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500" >
                  <div class="text-sm leading-5 text-blue-900">
                    IDR {{ (row.price / 100).toLocaleString('id-ID') }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500" >
                  <div class="text-sm leading-5 text-blue-900">
                    IDR {{(row.price * row.qty / 100).toLocaleString('id-ID')}}
                  </div>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
                >
                  <button
                    class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--  -->
    <div v-else>
      <span class="nodata">
        There are no products you added to cart. Go add some!
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartProducts: Array,
    headers: Array,
  },

  methods: {
    changeQty(id, data) {
      axios({
        headers: {
          access_token: localStorage.access_token,
        },
      }).catch(({ response }) => {
        swal.showSwalError(response.data.join("<br>"));
      });
    },
    deleteFromCart({ commit }, id) {
      axios({
        url: `/cart/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          swal.showToastSuccess(data.message);
        })
        .catch(({ response }) => {
          swal.showSwalError(response.data.join("<br>"));
        });
    },
    clearCart({ commit }) {},
  },
};
</script>

<style>
</style>