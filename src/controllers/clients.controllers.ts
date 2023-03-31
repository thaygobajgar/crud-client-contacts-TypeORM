import { Request, Response, NextFunction } from "express";
import { IClient, IClientUpdate } from "../interfaces";
import {
  createClientService,
  deleteClientService,
  listClientByIdService,
  listClientsService,
  showProfileService,
  updateClientService,
} from "../services/clients";

const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientData: IClient = req.body;

  const newClient = await createClientService(clientData);

  return res.status(201).json(newClient);
};

const listClientsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients = await listClientsService();
  return res.status(201).json(clients);
};

const listClientByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = req.params.id;
  const client = await listClientByIdService(clientId);

  return res.json(client);
};

const showProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = req.client.id;
  const profile = await showProfileService(clientId);

  return res.json(profile);
};

const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteClientService(req.params.id);
  return res.status(204).json();
};

const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
  listClientByIdController,
  showProfileController,
};
