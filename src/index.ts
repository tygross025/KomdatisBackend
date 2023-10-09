import cors from "cors";
import express from "express";
import "./config/db";
import userRoutes from "./route/user-routes";
import buildingRoutes from "./route/building-routes";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("");

app.use("/users", userRoutes);
app.use("/buildings", buildingRoutes);

app.listen(3001, () => {
  console.log("Server is running");
});
