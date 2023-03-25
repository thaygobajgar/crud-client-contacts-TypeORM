import { Router } from "express";
import {
  ensureClientExistsMiddleware,
  ensureDataIsValidMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares";
import { clientSchema, clientUpdateSchema } from "../schemas";
import {
  createClientController,
  listClientsController,
  deleteClientController,
  updateClientController,
} from "../controllers";

const clientRoutes: Router = Router();

clientRoutes.get("", ensureTokenIsValidMiddleware, listClientsController);

clientRoutes.delete(
  "/:id",
  ensureClientExistsMiddleware,
  deleteClientController
);

clientRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(clientUpdateSchema),
  ensureClientExistsMiddleware,
  updateClientController
);

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchema),
  createClientController
);

export default clientRoutes;
