import { Router } from "express";
import { createSessionController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  //   ensureDataIsValidMiddleware(sessionSerializer),
  createSessionController
);

export default sessionRoutes;
