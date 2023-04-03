// const { constant } = require("../constant");
import { constant } from "../constant.js";

const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION_ERROR",
        message: err.message,
        stuckTrack: err.stuck,
      });
      break;
    case constant.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stuckTrack: err.stuck,
      });
    case constant.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stuckTrack: err.stuck,
      });
    case constant.NOT_FOUND:
      res.json({
        title: "NOT_FOUND",
        message: err.message,
        stuckTrack: err.stuck,
      });
    default:
      console.log(" No Error All Good ! ");
      break;
  }
};

export default errorHandle;
