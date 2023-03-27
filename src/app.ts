import "express-async-errors";
import express, { Application } from "express";
import handleErrors from "./errors/handlerErrors";
import { clientRoutes, sessionRoutes } from "./routers";

const app: Application = express();
app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/login", sessionRoutes);

app.use(handleErrors);

export default app;
