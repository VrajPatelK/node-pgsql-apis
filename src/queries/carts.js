const createNewCart = `
INSERT INTO CARTS (USER_ID, PRODUCT_ID, quantity)
VALUES
  ($1,$2,$3)`;
const getAllCarts = `SELECT * FROM CARTS`;
const getCartsByUserId = `SELECT * FROM CARTS WHERE USER_ID = $1`;
const deleteCartByUserIdAndProductId = `DELETE FROM CARTS WHERE USER_ID = $1 AND PRODUCT_ID = $2`;

export {
  createNewCart,
  getAllCarts,
  getCartsByUserId,
  deleteCartByUserIdAndProductId,
};
