import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./app/module/routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use('/api/v1/', router)

export default app;
