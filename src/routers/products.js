import { Router } from "express";
import {
  createNewProductApi,
  createNewProductsApi,
  getAllProductsApi,
  getProductByIdApi,
  updateProductByIdApi,
  deductStockApi,
  deleteProductByIdApi,
  deleteProductsByIdApi,
  deleteProductsByIdInRangeApi,
  getProductsByIdInRangeApi,
} from "../controllers/products.js";

import { deductStockMw } from "../middlewares/deductStock.js";

const router = Router();

router.get("/", getAllProductsApi);
router.get("/:productId", getProductByIdApi);
router.get("/multiple/start/:start/end/:end", getProductsByIdInRangeApi);
router.post("/", createNewProductApi);
router.post("/multiple", createNewProductsApi);
router.put("/:productId", updateProductByIdApi);
router.delete("/:productId", deleteProductByIdApi);
router.delete("/multiple/:productIds", deleteProductsByIdApi);
router.delete("/multiple/start/:start/end/:end", deleteProductsByIdInRangeApi);

export default router;
