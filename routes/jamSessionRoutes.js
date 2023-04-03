import express from "express";
import {
  getAllJamSessions,
  createJamSession,
  deleteJamSession,
  updateJamSession,
  getJamSessionsInRadius,
} from "../controllers/jamcontrollers.js";

const router = express.Router();

router.route("/").get(getAllJamSessions);
router.route("/radius/:zipcode/:distance").get(getJamSessionsInRadius);

router
  .route("/:id")
  .post(createJamSession)
  .delete(deleteJamSession)
  .put(updateJamSession);

export default router;
