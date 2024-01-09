import { pool } from "../db/credential.js";
import format from "pg-format";
import {
  createNewProduct,
  createNewProducts,
  getAllProducts,
  getProductById,
  updateProductById,
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
  var ids = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  const query = format(getProductsById, ids);
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
  const { id } = req.params;
  try {
    pool.query(getProductById, [id], (error, records) => {
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
  const { id } = req.params;
  const { name, description, price, quantity_in_stock, category } = req.body;
  try {
    pool.query(
      updateProductById,
      [id, name, description, price, quantity_in_stock, category],
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
  const { id } = req.params;
  try {
    pool.query(deleteProductById, [id], (error, records) => {
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
  const { ids } = req.params;
  var ids_converted = ids.split(",").map((id) => parseInt(id));
  const query = format(deleteProductsById, ids_converted);
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
  var ids = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  const query = format(deleteProductsById, ids);
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
  deleteProductByIdApi,
  deleteProductsByIdApi,
  deleteProductsByIdInRangeApi,
};
