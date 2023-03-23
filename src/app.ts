import express, { Application } from "express";
import handleError from "./errors/handlerError";

const app: Application = express();
app.use(express.json());
app.use(handleError);

export default app;
