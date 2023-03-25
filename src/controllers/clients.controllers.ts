import { Request, Response, NextFunction } from "express";
import { IClient, IClientUpdate } from "../interfaces";
import {
  createClientService,
  deleteClientService,
  listClientsService,
  updateClientService,
} from "../services/clients";

const createClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientData: IClient = req.body;

  const newClient = await createClientService(clientData);

  return res.status(201).json(newClient);
};

const listClientsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clients = await listClientsService();
  return res.status(201).json(clients);
};

const deleteClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await deleteClientService(req.params.id);
  return res.status(204).json();
};
const updateClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientData: IClientUpdate = req.body;
  const clientId: string = req.params.id;
  const updatedClient = await updateClientService(clientId, clientData);
  return res.status(200).json(updatedClient);
};

export {
  createClientController,
  listClientsController,
  deleteClientController,
  updateClientController,
};
