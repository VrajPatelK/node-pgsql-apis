import { pool } from "./credential.js";

function open_connection(params) {
  // Event listener for successful connection
  pool.on("connect", (client) => {
    console.log("Client connected to the database");
  });
}

function close_connection(params) {
  // Close the connection pool when your application is shutting down
  pool
    .end()
    .then(() => console.log("Connection pool closed"))
    .catch((err) => console.error("Error closing connection pool", err));
}

function remove(params) {
  // Event listener for client disconnection
  pool.on("remove", (client) => {
    console.log("Client removed from the connection pool");
  });
}

function db_error(params) {
  // Event listener for errors
  pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
  });
}

export { open_connection, close_connection, remove, db_error };
