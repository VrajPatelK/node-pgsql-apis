import { pool } from "../db/credential.js";
import {
  createNewOrderItems,
  getAllOrdersByUserId,
  getOrderSummary,
  getOrderById,
  getAllOrdersByUserWithStatusId,
  updateOrderStatus,
} from "../queries/orders.js";

// helper
async function generateOrderItems(orderId, productId, quantity, subtotal) {
  return new Promise((resolve, reject) => {
    pool.query(
      createNewOrderItems,
      [orderId, productId, quantity, subtotal],
      (error, records) => {
        if (error) {
          reject(error);
        } else {
          resolve(records.rowCount);
        }
      }
    );
  });
}

async function placeOrder(req, res) {
  const { orderId, products } = req?.body;

  try {
    for (let i = 0; i < products?.length; i++) {
      await generateOrderItems(
        orderId,
        products[i].productId,
        products[i].quantity,
        products[i].subtotal
      );
    }
    return res.status(200).json({
      message: "order created",
      orderId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
      errorMessage: error.message,
    });
  }
}

async function getOrderByIdApi(req, res) {
  const { orderId } = req?.params;
  try {
    // get all orders
    pool.query(getOrderById, [orderId], (error, records) => {
      if (error) {
        throw error;
      } else {
        return res.json(records.rows);
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
      errorMessage: error.message,
    });
  }
}

async function getAllOrderItemsByUserIdApi(req, res) {
  const { userId, order_status } = req?.params;
  var query = "";
  var queryOptions = [];

  try {
    // based on status set query & queryOptions
    if (order_status === "all") {
      query = getAllOrdersByUserId;
      queryOptions = [userId];
    } else if (order_status === "Pending" || order_status === "Placed") {
      query = getAllOrdersByUserWithStatusId;
      queryOptions = [userId, order_status];
    } else {
      return res.status(404).json({
        message: "category doesn't found",
      });
    }

    // get all orders
    pool.query(query, queryOptions, (error, records) => {
      if (error) {
        throw error;
      } else {
        return res.json(records.rows);
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
      errorMessage: error.message,
    });
  }
}

async function getOrderSummaryApi(req, res) {
  try {
    pool.query(getOrderSummary, (error, records) => {
      if (error) {
        throw error;
      } else {
        return res.json(records.rows);
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
      errorMessage: error.message,
    });
  }
}

async function updateOrderStatusApi(req, res) {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    pool.query(updateOrderStatus, [orderId, status], (error, records) => {
      if (error) {
        throw error;
      } else {
        return res.json(records.rows);
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever Error",
      errorMessage: error.message,
    });
  }
}

export {
  placeOrder,
  getAllOrderItemsByUserIdApi,
  getOrderSummaryApi,
  getOrderByIdApi,
  updateOrderStatusApi,
};
