import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  listContactsByClientController,
  listContactsController,
  updateContactController,
} from "../controllers";
import {
  ensureClientExistsMiddleware,
  ensureContactExistsMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsContactOwnerOrAdminMiddleware,
  ensureIsOwnerOrAdminMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import { contactSchema, contactUpdateSchema } from "../schemas";

const contactRoutes: Router = Router();

contactRoutes.post(
  "",
  ensureDataIsValidMiddleware(contactSchema),
  ensureTokenIsValidMiddleware,
  createContactController
);

contactRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listContactsController
);
contactRoutes.get(
  "/client/:id",
  ensureTokenIsValidMiddleware,
  ensureClientExistsMiddleware,
  ensureIsOwnerOrAdminMiddleware,
  listContactsByClientController
);
contactRoutes.get("/:id", ensureIsContactOwnerOrAdminMiddleware);

contactRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(contactUpdateSchema),
  ensureTokenIsValidMiddleware,
  ensureContactExistsMiddleware,
  ensureIsContactOwnerOrAdminMiddleware,
  updateContactController
);

contactRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureContactExistsMiddleware,
  ensureIsContactOwnerOrAdminMiddleware,
  deleteContactController
);

export default contactRoutes;
