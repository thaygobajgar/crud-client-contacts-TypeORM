import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      client: {
        id: string;
        isAdm: boolean;
        isActive: boolean;
      };
    }
  }
}
