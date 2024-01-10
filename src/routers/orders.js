import { Router } from "express";
import { deductStockMw } from "../middlewares/deductStock.js";
import {
  getAllOrderItemsByUserIdApi,
  placeOrder,
  getOrderSummaryApi,
  getOrderByIdApi,
  updateOrderStatusApi,
} from "../controllers/orders.js";

const router = Router();

router.post("/place", deductStockMw, placeOrder);
router.get(
  "/users/:userId/order_status/:order_status",
  getAllOrderItemsByUserIdApi
);
router.get("/summary", getOrderSummaryApi);
router.get("/:orderId", getOrderByIdApi);
router.put("/:orderId", updateOrderStatusApi);
export default router;
