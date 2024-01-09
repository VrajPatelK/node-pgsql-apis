const createNewCart = `
INSERT INTO CARTS (userId, productId, quantity)
VALUES
  ($1,$2)`;

const createNewCarts = `INSERT INTO CARTS (userId, productId, quantity) VALUES %L`;
const getAllCarts = `SELECT * FROM CARTS`;
const getCartsById = `SELECT * FROM CARTS WHERE ID in (%L)`;
const getCartsByUserId = `SELECT * FROM CARTS WHERE userId = $1`;
const updateCartById = `
UPDATE CARTS SET 
USERID = $2, 
PRODUCTID = $3, 
QUANTITY = $4,
WHERE ID = $1`;

const deleteCartById = `DELETE FROM CARTS WHERE ID = $1`;
const deleteCartsById = `DELETE FROM CARTS WHERE ID in (%L)`;

export {
  createNewCart,
  createNewCarts,
  getAllCarts,
  getCartsByUserId,
  getCartsById,
  updateCartById,
  deleteCartById,
  deleteCartsById,
};
