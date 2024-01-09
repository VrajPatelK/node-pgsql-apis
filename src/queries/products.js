const createNewProduct = `
INSERT INTO PRODUCTS (name, description, price, quantity_in_stock, category)
VALUES
  ($1,$2,$3,$4,$5)`;

const createNewProducts = `INSERT INTO PRODUCTS (name, description, price, quantity_in_stock, category) VALUES %L`;
const getAllProducts = `SELECT * FROM PRODUCTS`;
const getProductById = `SELECT * FROM PRODUCTS WHERE ID = $1`;
const updateProductById = `
UPDATE PRODUCTS SET 
NAME = $2, 
DESCRIPTION = $3, 
PRICE=$4, 
QUANTITY_IN_STOCK = $5, 
CATEGORY = $6
WHERE ID = $1`;

const deleteProductById = `DELETE FROM PRODUCTS WHERE ID = $1`;

export {
  createNewProduct,
  createNewProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
