import { Request, Response } from "express";
import { IClientUpdate, IContact } from "../interfaces";

import {
  createContactService,
  listContactsByClientService,
  listContactsService,
  updateContactService,
  deleteContactService,
} from "../services/contacts";

const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId: string = req.client.id;
  const contactData: IContact = req.body;

  const newContact = await createContactService(clientId, contactData);
  return res.status(201).json(newContact);
};

const listContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contacts = await listContactsService();
  return res.json(contacts);
};

const listContactsByClientController = async (req: Request, res: Response) => {
  const clientId = req.params.id;

  const contacts = await listContactsByClientService(clientId);
  return res.json(contacts);
};

const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData: IClientUpdate = req.body;
  const contactId: string = req.params.id;
  const updatedContact = await updateContactService(contactId, contactData);
  return res.json(updatedContact);
};

const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId: string = req.params.id;
  await deleteContactService(contactId);
  return res.status(204).json();
};

export {
  createContactController,
  listContactsController,
  listContactsByClientController,
  updateContactController,
  deleteContactController,
};
