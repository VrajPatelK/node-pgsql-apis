import { Router } from "express";
import {
  createNewProductApi,
  createNewProductsApi,
  deleteProductByIdApi,
  getAllProductsApi,
  getAllProductsByIdApi,
  updateProductByIdApi,
} from "../controllers/products.js";
const router = Router();

router.get("/", getAllProductsApi);
router.post("/", createNewProductApi);
router.post("/multiple", createNewProductsApi);
router.get("/:id", getAllProductsByIdApi);
router.put("/:id", updateProductByIdApi);
router.delete("/:id", deleteProductByIdApi);

export default router;
