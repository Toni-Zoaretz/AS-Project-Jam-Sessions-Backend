import express from "express";

import {
  createUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../controllers/usercontrollers.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/email/:email").get(getUserByEmail);

export default router;
