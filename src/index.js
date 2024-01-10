// pkgs
import express from "express";
import dotenv from "dotenv";
import "colors";

// routers
import product_routers from "./routers/products.js";
import user_routers from "./routers/users.js";
import cart_routers from "./routers/carts.js";
import order_routers from "./routers/orders.js";

dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT);

// middlewares
app.use(express.json());
app.use("/api/v1/products/", product_routers);
app.use("/api/v1/users/", user_routers);
app.use("/api/v1/carts/", cart_routers);
app.use("/api/v1/orders/", order_routers);

// server
app.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`.bgGreen.bold);
});
