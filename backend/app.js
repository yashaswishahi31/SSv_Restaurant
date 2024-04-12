import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import path from "path";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
// const path = require("path");
const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   res
// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
  

dbConnection();

app.use(errorMiddleware);

export default app;