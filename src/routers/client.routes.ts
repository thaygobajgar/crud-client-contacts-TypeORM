import { Router } from "express";
import {
  ensureClientDoNotExistsMiddleware,
  ensureClientExistsMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsOwnerOrAdminMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares";
import { clientSchema, clientUpdateSchema } from "../schemas";
import {
  createClientController,
  listClientsController,
  deleteClientController,
  updateClientController,
} from "../controllers";
import {
  listClientByIdController,
  showProfileController,
} from "../controllers/clients.controllers";

const clientRoutes: Router = Router();

clientRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  showProfileController
);

clientRoutes.delete(
  "/",
  ensureTokenIsValidMiddleware,
  ensureClientExistsMiddleware,
  deleteClientController
);

clientRoutes.patch(
  "/",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(clientUpdateSchema),
  ensureClientExistsMiddleware,
  updateClientController
);

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchema),
  ensureClientDoNotExistsMiddleware,
  createClientController
);

export default clientRoutes;
