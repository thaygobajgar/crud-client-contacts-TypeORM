import { Router } from "express";
import {
  listClientByIdController,
  listClientsController,
} from "../controllers";
import {
  ensureIsOwnerOrAdminMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares";

const adminRoutes: Router = Router();

adminRoutes.get(
  "/clients",
  ensureTokenIsValidMiddleware,
  listClientsController
);

adminRoutes.get(
  "/clients/:id",
  ensureTokenIsValidMiddleware,
  ensureIsOwnerOrAdminMiddleware,
  listClientByIdController
);

export default adminRoutes;
