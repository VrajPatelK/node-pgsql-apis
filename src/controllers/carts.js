import { pool } from "../db/credential.js";
import format from "pg-format";
import bcryptjs from "bcryptjs";

import {
  createNewCart,
  createNewCarts,
  getAllCarts,
  getCartsById,
  updateCartById,
  deleteCartById,
  deleteCartsById,
  getCartsByUserId,
} from "../queries/carts.js";

async function createNewCartsApi(req, res) {
  var records = req?.body;
  records = records?.map((record) => [
    record.userId,
    record.productId,
    quantity,
  ]);
  const query = format(createNewCarts, records);
  try {
    pool.query(query, (error, records) => {
      if (error) throw error;
      return res
        .status(200)
        .json({ message: `records inserted : ${records.rowCount}` });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}
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

async function getCartsByIdApi(req, res) {
  const { ids } = req.params;
  var ids_converted = ids.split(",").map((id) => parseInt(id));
  const query = format(getCartsById, ids_converted);
  try {
    pool.query(query, (error, records) => {
      if (error) throw error;
      return res.status(200).json(records.rows);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateCartByIdApi(req, res) {
  const { id } = req.params;
  const { userId, productId, quantity } = req.body;
  try {
    pool.query(
      updateCartById,
      [id, userId, productId, quantity],
      (error, records) => {
        if (error) throw error;
        return res
          .status(200)
          .json({ message: `records updated : ${records.rowCount}` });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteCartByIdApi(req, res) {
  const { id } = req.params;
  try {
    pool.query(deleteCartById, [id], (error, records) => {
      if (error) throw error;
      return res
        .status(200)
        .json({ message: `records deleted : ${records.rowCount}` });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteCartsByIdApi(req, res) {
  const { ids } = req.params;
  var ids_converted = ids.split(",").map((id) => parseInt(id));
  const query = format(deleteCartsById, ids_converted);
  try {
    pool.query(query, (error, records) => {
      if (error) throw error;
      return res
        .status(200)
        .json({ message: `records deleted : ${records.rowCount}` });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

export {
  getAllCartsApi,
  getCartsByIdApi,
  getCartsByUserIdApi,
  createNewCartApi,
  createNewCartsApi,
  updateCartByIdApi,
  deleteCartByIdApi,
  deleteCartsByIdApi,
};
