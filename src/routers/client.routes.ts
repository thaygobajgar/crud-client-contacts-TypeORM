import { Router } from "express";
import {
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
  "/:id",
  ensureClientExistsMiddleware,
  ensureIsOwnerOrAdminMiddleware,
  deleteClientController
);

clientRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(clientUpdateSchema),
  ensureClientExistsMiddleware,
  ensureIsOwnerOrAdminMiddleware,
  updateClientController
);

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchema),
  createClientController
);

export default clientRoutes;
