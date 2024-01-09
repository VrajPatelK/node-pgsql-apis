import { pool } from "../db/credential.js";

import {
  createNewCart,
  getAllCarts,
  getCartsByUserId,
  deleteCartByUserIdAndProductId,
} from "../queries/carts.js";

async function createNewCartApi(req, res) {
  const { userId, productId, quantity } = req.body;
  try {
    pool.query(
      createNewCart,
      [userId, productId, quantity],
      (error, records) => {
        if (error) throw error;
        return res
          .status(200)
          .json({ message: `records inserted : ${records.rowCount}` });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllCartsApi(req, res) {
  try {
    pool.query(getAllCarts, (error, records) => {
      if (error) throw error;
      return res.status(200).json(records.rows);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getCartsByUserIdApi(req, res) {
  const { userId } = req.params;
  try {
    pool.query(getCartsByUserId, [userId], (error, records) => {
      if (error) throw error;
      return res.status(200).json(records.rows);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteCartByUserIdAndProductIdApi(req, res) {
  const { userId, productId } = req.params;
  try {
    pool.query(
      deleteCartByUserIdAndProductId,
      [userId, productId],
      (error, records) => {
        if (error) throw error;
        return res
          .status(200)
          .json({ message: `records deleted : ${records.rowCount}` });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

export {
  getAllCartsApi,
  getCartsByUserIdApi,
  createNewCartApi,
  deleteCartByUserIdAndProductIdApi,
};
