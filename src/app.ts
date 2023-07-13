import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

export default app;
