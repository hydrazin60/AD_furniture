import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import staffAuthRouter from "./routes/Auth/staffAuth.routes.js";
import BranchRouter from "./routes/Branch/Branch.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/ad_furniture/staff/auth", staffAuthRouter);
app.use("/api/v1/ad_furniture/branch", BranchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
