require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const errHandler = require("./middlewares/errHandler");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const bannerRouter = require("./routes/bannerRouter");
const cartRouter = require("./routes/cartRouter");
const wishlistRouter = require("./routes/wishlistRouter");

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// User Routes
app.use(userRouter);

// Product Routes
app.use("/products", productRouter);

// Banner Routes
app.use("/banners", bannerRouter);

// Cart Routes
app.use("/carts", cartRouter);

// Wishlist Routes
app.use("/wishlists", wishlistRouter);

// Error Handler
app.use(errHandler);

app.listen(port, () => {
  console.log(`E-commerce App listening at http://localhost:${port}`);
});

module.exports = app;