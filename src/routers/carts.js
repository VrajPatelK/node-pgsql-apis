import { Router } from "express";
import {
  getAllCartsApi,
  getCartsByUserIdApi,
  createNewCartApi,
  deleteCartByUserIdAndProductIdApi,
} from "../controllers/carts.js";
const router = Router();

router.get("/", getAllCartsApi);
router.get("/users/:userId", getCartsByUserIdApi);
router.post("/", createNewCartApi);
router.delete(
  "/userId/:userId/productId/:productId",
  deleteCartByUserIdAndProductIdApi
);

export default router;
