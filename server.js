import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import jamSessionRoutes from "./routes/jamSessionRoutes.js";

import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(cors());

app.use(errorHandler);

// Body parser middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => res.send("Server running"));

app.use("/api/v1/jam-user", userRoutes);
app.use("/api/v1/jam-sessions", jamSessionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV}
mode on port ${PORT}`)
);
