// pkgs
import express from "express";
import dotenv from "dotenv";
import "colors";

// routers
import product_routers from "./routers/products.js";
import user_routers from "./routers/users.js";
import cart_routers from "./routers/carts.js";

dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT);

// middlewares
app.use(express.json());
app.use("/api/products/v1/", product_routers);
app.use("/api/users/v1/", user_routers);
app.use("/api/carts/v1/", cart_routers);

// server
app.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`.bgGreen.bold);
});
