<template>
  <!-- Footer Section Begin -->
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="footer__about">
            <div class="footer__logo">
              <a @click.prevent="$router.push('/')" href="">
                <img src="img/footer-logo.png" alt />
              </a>
            </div>
            <p>The customer is at the heart of our unique business model, which includes design.</p>
            <a>
              <img src="img/payment.png" alt />
            </a>
          </div>
        </div>
        <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
          <div class="footer__widget">
            <h6>Shopping</h6>
            <ul>
              <li>
                <a>Clothing Store</a>
              </li>
              <li>
                <a>Trending Shoes</a>
              </li>
              <li>
                <a>Accessories</a>
              </li>
              <li>
                <a>Sale</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-6">
          <div class="footer__widget">
            <h6>Shopping</h6>
            <ul>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                <a>Payment Methods</a>
              </li>
              <li>
                <a>Delivary</a>
              </li>
              <li>
                <a>Return & Exchanges</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
          <div class="footer__widget">
            <h6>NewLetter</h6>
            <div class="footer__newslatter">
              <p>Be the first to know about new arrivals, look books, sales & promos!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer Section End -->
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
</style>
