import "express-async-errors";
import express, { Application } from "express";
import handleErrors from "./errors/handlerErrors";
import { clientRoutes, contactRoutes, sessionRoutes } from "./routers";

const app: Application = express();
app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactRoutes);

app.use(handleErrors);

export default app;
