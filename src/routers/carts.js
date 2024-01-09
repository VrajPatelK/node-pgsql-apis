import { Router } from "express";
import {
  getAllCartsApi,
  getCartsByIdApi,
  getCartsByUserIdApi,
  createNewCartApi,
  createNewCartsApi,
  updateCartByIdApi,
  deleteCartByIdApi,
  deleteCartsByIdApi,
} from "../controllers/carts.js";
const router = Router();

router.get("/", getAllCartsApi);
router.get("/:userId", getCartsByUserIdApi);
router.get("/multiple/:ids", getCartsByIdApi);
router.post("/", createNewCartApi);
router.post("/multiple", createNewCartsApi);
router.put("/:id", updateCartByIdApi);
router.delete("/:id", deleteCartByIdApi);
router.delete("/multiple/:ids", deleteCartsByIdApi);

export default router;
