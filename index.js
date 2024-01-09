// pkgs
import express from "express";
import dotenv from "dotenv";
import "colors";

// routers
import product_routers from "./src/routers/products.js";

dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT);

// middlewares
app.use(express.json());
app.use("/api/products/v1/", product_routers);

// server
app.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`.bgGreen.bold);
});
