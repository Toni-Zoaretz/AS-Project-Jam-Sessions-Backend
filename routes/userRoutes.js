import express from "express";

import {
  createUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserByName,
} from "../controllers/usercontrollers.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/email/:email").get(getUserByEmail);
router.route("/name/:name").get(getUserByName);

export default router;
