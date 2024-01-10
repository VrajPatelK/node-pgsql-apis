import { deductStock, getProductsById } from "../queries/products.js";
import { pool } from "../db/credential.js";
import format from "pg-format";
import { createNewOrder } from "../queries/orders.js";

// helper
async function deduct_stock(product) {
  return new Promise((resolve, reject) => {
    pool.query(
      deductStock,
      [product?.productId, product?.updated_quantity],
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

// helper
async function generateOrder(userId, total_amount) {
  return new Promise((resolve, reject) => {
    pool.query(createNewOrder, [userId, total_amount], (error, records) => {
      if (error) {
        reject(error);
      } else {
        resolve(records.rows.at(0));
      }
    });
  });
}

async function deductStockMw(req, res, next) {
  const { userId, products } = req?.body;
  try {
    // get product ids
    var productIds_converted = products?.map((product) =>
      parseInt(product.productId)
    );

    // get products -> check stock -> deduct stock
    const query = format(getProductsById, productIds_converted);

    // fecthed products data
    pool.query(query, async (error, records) => {
      try {
        if (error) throw error;
        const fetched_products = records.rows;

        // check stock
        for (let i = 0; i < fetched_products.length; i++) {
          const p1 = fetched_products[i];
          for (let j = 0; j < products.length; j++) {
            const p2 = products[j];
            if (p2.productId === p1.id) {
              if (p2.quantity > p1.quantity_in_stock) {
                return res.status(404).json({ message: "out of stock" });
              } else {
                products[j].updated_quantity =
                  p1.quantity_in_stock - p2.quantity;
              }

              // calc. subtotal
              products[j].subtotal = products[j].quantity * p1.price;
            }
          }
        }

        // deduct stock
        for (let i = 0; i < products.length; i++) {
          await deduct_stock(products[i]);
        }

        // calc. total amount
        const total_amount = products?.reduce((acc, product) => {
          acc += product.subtotal;
          return acc;
        }, 0);

        // generate new order
        var order = await generateOrder(userId, total_amount);
        req.body.orderId = order?.id;

        // next ()
        next();
      } catch (error) {
        return res.status(500).json({
          message: "Internal Server Error",
          errorMessage: error.message,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
}

export { deductStockMw };
