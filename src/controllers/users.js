import { pool } from "../db/credential.js";
import format from "pg-format";
import bcryptjs from "bcryptjs";

import {
  createNewUser,
  createNewUsers,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteUsersById,
  getUsersById,
} from "../queries/users.js";

async function createNewUsersApi(req, res) {
  var records = req?.body;
  records = records?.map((record) => [
    record.username,
    record.email,
    bcryptjs.hashSync(record.password),
  ]);
  const query = format(createNewUsers, records);
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
async function createNewUserApi(req, res) {
  const { username, email, password } = req.body;
  try {
    pool.query(
      createNewUser,
      [username, email, bcryptjs.hashSync(password)],
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

async function getAllUsersApi(req, res) {
  try {
    pool.query(getAllUsers, (error, records) => {
      if (error) throw error;
      return res.status(200).json(records.rows);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUsersByIdInRangeApi(req, res) {
  const { start: s, end: e } = req.params;
  const start = parseInt(s);
  const end = parseInt(e);
  var ids = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  const query = format(getUsersById, ids);
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

async function getUserByIdApi(req, res) {
  const { id } = req.params;
  try {
    pool.query(getUserById, [id], (error, records) => {
      if (error) throw error;
      return res.status(200).json(records.rows);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateUserByIdApi(req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    pool.query(
      updateUserById,
      [id, username, email, bcryptjs.hashSync(password)],
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

async function deleteUserByIdApi(req, res) {
  const { id } = req.params;
  try {
    pool.query(deleteUserById, [id], (error, records) => {
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

async function deleteUsersByIdApi(req, res) {
  const { ids } = req.params;
  var ids_converted = ids.split(",").map((id) => parseInt(id));
  const query = format(deleteUsersById, ids_converted);
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

async function deleteUsersByIdInRangeApi(req, res) {
  const { start: s, end: e } = req.params;
  const start = parseInt(s);
  const end = parseInt(e);
  var ids = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  const query = format(deleteUsersById, ids);
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
  getAllUsersApi,
  getUserByIdApi,
  getUsersByIdInRangeApi,
  createNewUserApi,
  createNewUsersApi,
  updateUserByIdApi,
  deleteUserByIdApi,
  deleteUsersByIdApi,
  deleteUsersByIdInRangeApi,
};
