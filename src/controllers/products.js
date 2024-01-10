import { pool } from "../db/credential.js";
import format from "pg-format";
import {
  createNewProduct,
  createNewProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deductStock,
  deleteProductById,
  deleteProductsById,
  getProductsById,
} from "../queries/products.js";

async function createNewProductsApi(req, res) {
  var records = req?.body;
  records = records?.map((record) => [
    record.name,
    record.description,
    record.price,
    record.quantity_in_stock,
    record.category,
  ]);
  const query = format(createNewProducts, records);
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
async function createNewProductApi(req, res) {
  const { name, description, price, quantity_in_stock, category } = req.body;
  try {
    pool.query(
      createNewProduct,
      [name, description, price, quantity_in_stock, category],
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

async function getAllProductsApi(req, res) {
  try {
    pool.query(getAllProducts, (error, records) => {
      if (error) throw error;
      return res.status(200).json(records.rows);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getProductsByIdInRangeApi(req, res) {
  const { start: s, end: e } = req.params;
  const start = parseInt(s);
  const end = parseInt(e);
  var productIds = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  const query = format(getProductsById, productIds);
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

async function getProductByIdApi(req, res) {
  const { productId } = req.params;
  try {
    pool.query(getProductById, [productId], (error, records) => {
      if (error) throw error;
      return res.status(200).json(records.rows);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateProductByIdApi(req, res) {
  const { productId } = req.params;
  const { name, description, price, quantity_in_stock, category } = req.body;
  try {
    pool.query(
      updateProductById,
      [productId, name, description, price, quantity_in_stock, category],
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

async function deductStockApi(req, res) {
  const { productId } = req?.params;
  const { updated_quantity } = req?.body;
  try {
    pool.query(
      deductStock,
      [parseInt(productId), updated_quantity],
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

async function deleteProductByIdApi(req, res) {
  const { productId } = req.params;
  try {
    pool.query(deleteProductById, [productId], (error, records) => {
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

async function deleteProductsByIdApi(req, res) {
  const { productIds } = req.params;
  var productIds_converted = productIds
    .split(",")
    .map((productId) => parseInt(productId));
  const query = format(deleteProductsById, productIds_converted);
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

async function deleteProductsByIdInRangeApi(req, res) {
  const { start: s, end: e } = req.params;
  const start = parseInt(s);
  const end = parseInt(e);
  var productIds = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  const query = format(deleteProductsById, productIds);
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
  getAllProductsApi,
  getProductByIdApi,
  getProductsByIdInRangeApi,
  createNewProductApi,
  createNewProductsApi,
  updateProductByIdApi,
  deductStockApi,
  deleteProductByIdApi,
  deleteProductsByIdApi,
  deleteProductsByIdInRangeApi,
};
