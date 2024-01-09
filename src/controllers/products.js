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
  var records = req.body;
  records = records?.map((record, index) => [
    record.name,
    record.description,
    record.price,
    record.quantity_in_stock,
    record.category,
  ]);
  const query = format(createNewProducts, records);
  // console.log(query);
  pool.query(query, (error, response) => {
    if (error) throw error;
    return res
      .status(200)
      .json({ message: `records inserted : ${response.rowCount}` });
  });
}
async function createNewProductApi(req, res) {
  const { name, description, price, quantity_in_stock, category } = req.body;
  pool.query(
    createNewProduct,
    [name, description, price, quantity_in_stock, category],
    (error, response) => {
      if (error) throw error;
      return res
        .status(200)
        .json({ message: `records inserted : ${response.rowCount}` });
    }
  );
}

async function getAllProductsApi(req, res) {
  pool.query(getAllProducts, (error, response) => {
    if (error) throw error;
    return res.status(200).json(response.rows);
  });
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
  pool.query(query, (error, response) => {
    if (error) throw error;
    return res.status(200).json(response.rows);
  });
}

async function getProductByIdApi(req, res) {
  const { id } = req.params;
  pool.query(getProductById, [id], (error, response) => {
    if (error) throw error;
    return res.status(200).json(response.rows);
  });
}

async function updateProductByIdApi(req, res) {
  const { id } = req.params;
  const { name, description, price, quantity_in_stock, category } = req.body;
  pool.query(
    updateProductById,
    [id, name, description, price, quantity_in_stock, category],
    (error, response) => {
      if (error) throw error;
      return res
        .status(200)
        .json({ message: `records updated : ${response.rowCount}` });
    }
  );
}

async function deleteProductByIdApi(req, res) {
  const { id } = req.params;
  pool.query(deleteProductById, [id], (error, response) => {
    if (error) throw error;
    return res
      .status(200)
      .json({ message: `records deleted : ${response.rowCount}` });
  });
}

async function deleteProductsByIdApi(req, res) {
  const { ids } = req.params;
  var ids_converted = ids.split(",").map((id) => parseInt(id));
  const query = format(deleteProductsById, ids_converted);
  pool.query(query, (error, response) => {
    if (error) throw error;
    return res
      .status(200)
      .json({ message: `records deleted : ${response.rowCount}` });
  });
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
  pool.query(query, (error, response) => {
    if (error) throw error;
    return res
      .status(200)
      .json({ message: `records deleted : ${response.rowCount}` });
  });
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
