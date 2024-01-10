const createNewOrder = `INSERT INTO ORDERS 
(USER_ID, TOTAL_AMOUNT)
VALUES
($1, $2) RETURNING *`;

const createNewOrderItems = `INSERT INTO ORDER_ITEMS
(ORDER_ID, PRODUCT_ID, QUANTITY, SUBTOTAL)
VALUES
($1, $2, $3, $4)`;

const getOrderById = `
SELECT Subquery.*, P.NAME, P.DESCRIPTION, P.CATEGORY, P.PRICE
FROM
  (
    SELECT
      O.ID AS ORDER_ID,
      O.USER_ID,
      O.TOTAL_AMOUNT,
      O.ORDER_DATE,
      O.STATUS,
      OI.PRODUCT_ID,
      OI.QUANTITY AS ORDERED_QUANTITY,
      OI.SUBTOTAL
    FROM
      ORDERS O
      INNER JOIN ORDER_ITEMS OI ON O.ID = OI.ORDER_ID
    WHERE
      O.ID = $1
  ) AS Subquery
  INNER JOIN PRODUCTS P ON Subquery.PRODUCT_ID = P.ID`;

const getAllOrdersByUserId = `
SELECT Subquery.*, P.NAME, P.DESCRIPTION, P.CATEGORY, P.PRICE
FROM
  (
    SELECT
      O.ID AS ORDER_ID,
      O.USER_ID,
      O.TOTAL_AMOUNT,
      O.ORDER_DATE,
      O.STATUS,
      OI.PRODUCT_ID,
      OI.QUANTITY AS ORDERED_QUANTITY,
      OI.SUBTOTAL
    FROM
      ORDERS O
      INNER JOIN ORDER_ITEMS OI ON O.ID = OI.ORDER_ID
    WHERE
      O.USER_ID = $1
  ) AS Subquery
  INNER JOIN PRODUCTS P ON Subquery.PRODUCT_ID = P.ID`;

const getAllOrdersByUserWithStatusId = `
SELECT Subquery.*, P.NAME, P.DESCRIPTION, P.CATEGORY, P.PRICE
FROM
  (
    SELECT
      O.ID AS ORDER_ID,
      O.USER_ID,
      O.TOTAL_AMOUNT,
      O.ORDER_DATE,
      O.STATUS,
      OI.PRODUCT_ID,
      OI.QUANTITY AS ORDERED_QUANTITY,
      OI.SUBTOTAL
    FROM
      ORDERS O
      INNER JOIN ORDER_ITEMS OI ON O.ID = OI.ORDER_ID
    WHERE
      O.USER_ID = $1 AND O.STATUS = $2
  ) AS Subquery
  INNER JOIN PRODUCTS P ON Subquery.PRODUCT_ID = P.ID`;

const getOrderSummary = `
SELECT Subquery.*, P.NAME, P.DESCRIPTION, P.CATEGORY, P.PRICE
FROM
  (
    SELECT
      O.ID AS ORDER_ID,
      O.USER_ID,
      O.TOTAL_AMOUNT,
      O.ORDER_DATE,
      O.STATUS,
      OI.PRODUCT_ID,
      OI.QUANTITY AS ORDERED_QUANTITY,
      OI.SUBTOTAL
    FROM
      ORDERS O
      INNER JOIN ORDER_ITEMS OI ON O.ID = OI.ORDER_ID
  ) AS Subquery
  INNER JOIN PRODUCTS P ON Subquery.PRODUCT_ID = P.ID`;

const updateOrderStatus = `
UPDATE ORDERS
SET STATUS = $2
WHERE ID = $1`;

export {
  createNewOrder,
  createNewOrderItems,
  getOrderById,
  getOrderSummary,
  getAllOrdersByUserId,
  getAllOrdersByUserWithStatusId,
  updateOrderStatus,
};
