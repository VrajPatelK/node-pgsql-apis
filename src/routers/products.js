import { Router } from "express";
import {
  createNewProductApi,
  createNewProductsApi,
  getAllProductsApi,
  getProductByIdApi,
  updateProductByIdApi,
  deleteProductByIdApi,
  deleteProductsByIdApi,
  deleteProductsByIdInRangeApi,
  getProductsByIdInRangeApi,
} from "../controllers/products.js";
const router = Router();

router.get("/", getAllProductsApi);
router.get("/:id", getProductByIdApi);
router.get("/multiple/start/:start/end/:end", getProductsByIdInRangeApi);
router.post("/", createNewProductApi);
router.post("/multiple", createNewProductsApi);
router.put("/:id", updateProductByIdApi);
router.delete("/:id", deleteProductByIdApi);
router.delete("/multiple/:ids", deleteProductsByIdApi);
router.delete("/multiple/start/:start/end/:end", deleteProductsByIdInRangeApi);

export default router;
