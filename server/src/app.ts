import express from "express";
import cors from "cors";
import config from "config";
import mongoose from "mongoose";
import useRouter from "../routes/auth.routes";
import userRouter from "../routes/user.roures";
import citiesRouter from "../routes/cities.roures";
import morgan from "morgan";

const app = express();
const PORT = config.get("port") || 8080;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/cities", citiesRouter);
app.use("/", useRouter);


async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));    
    app.get("/", (_req, res) => {
      res.send(`Hello, it"s me!`);
    });
    app.listen(PORT, () => {
      return console.log(`server is listening on ${PORT}`);
    });
  } catch (error: any) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}

start();
