import { Router } from "express";
import {
  createNewUserApi,
  createNewUsersApi,
  getAllUsersApi,
  getUserByIdApi,
  updateUserByIdApi,
  deleteUserByIdApi,
  deleteUsersByIdApi,
  deleteUsersByIdInRangeApi,
  getUsersByIdInRangeApi,
} from "../controllers/users.js";
const router = Router();

router.get("/", getAllUsersApi);
router.get("/:id", getUserByIdApi);
router.get("/multiple/start/:start/end/:end", getUsersByIdInRangeApi);
router.post("/", createNewUserApi);
router.post("/multiple", createNewUsersApi);
router.put("/:id", updateUserByIdApi);
router.delete("/:id", deleteUserByIdApi);
router.delete("/multiple/:ids", deleteUsersByIdApi);
router.delete("/multiple/start/:start/end/:end", deleteUsersByIdInRangeApi);

export default router;
