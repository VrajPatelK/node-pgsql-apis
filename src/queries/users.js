const createNewUser = `
INSERT INTO USERS (username, email, password)
VALUES
  ($1,$2,$3)`;

const createNewUsers = `INSERT INTO USERS (username, email, password) VALUES %L`;
const getAllUsers = `SELECT * FROM USERS`;
const getUserById = `SELECT * FROM USERS WHERE ID = $1`;
const getUsersById = `SELECT * FROM USERS WHERE ID in (%L)`;
const updateUserById = `
UPDATE USERS SET 
USERNAME = $2, 
EMAIL = $3, 
PASSWORD=$4
WHERE ID = $1`;

const deleteUserById = `DELETE FROM USERS WHERE ID = $1`;
const deleteUsersById = `DELETE FROM USERS WHERE ID in (%L)`;

export {
  createNewUser,
  createNewUsers,
  getAllUsers,
  getUserById,
  getUsersById,
  updateUserById,
  deleteUserById,
  deleteUsersById,
};
